import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { Announcement } from '../../../../../core/interfaces/dto/announcement/announcement';
import { User } from '../../../../../core/interfaces/dto/user/user';
import { AnnouncementService } from '../../../../../core/services/announcement/announcement.service';
import { TeacherService } from '../../../../../core/services/teacher/teacher.service';
import { ImageModule } from 'primeng/image';

interface ProcessedAnnouncement {
  id?: number;
  profilePicture?: Blob;
  title: string;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [CardModule, PanelModule, MenuModule, DatePipe, ImageModule],
  templateUrl: './announcements-cards.component.html',
  styleUrl: './announcements-cards.component.css',
})
export class AnnouncementsCardsComponent implements OnInit {
  public options: MenuItem[] = [];
  protected announcements: Announcement[] = [];
  protected processedAnnouncement: ProcessedAnnouncement[] = [];

  private readonly announcementService = inject(AnnouncementService);
  private readonly teacherService = inject(TeacherService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    // get user role for checking if user is admin
    const role = localStorage.getItem('role');

    // Retrieve all announcements
    this.announcementService.getAllAnnouncement().subscribe({
      next: (response: HttpResponse<Announcement[]>) => {
        // this.announcements = response.body ?? [];
        const announcements = response.body ?? [];
        // Loop each announcement and add the teacher profile.
        const observables = announcements
          .filter(
            (announcement) => announcement.user && announcement.user.teacher
          )
          .map((announcement: Announcement) =>
            // Get teacher profile picture
            this.teacherService
              .getTeacherProfilePicture(announcement.user.teacher?.id ?? 0)
              .pipe(
                tap((picture: Blob) => {
                  this.processedAnnouncement.push({
                    ...announcement,
                    profilePicture: picture,
                  });
                }),
                catchError((error: HttpErrorResponse) => {
                  if (error.status !== 404) {
                    console.error(
                      'Error fetching teacher profile picture:',
                      error
                    );
                  }
                  return of(null); // Return a fallback value
                })
              )
          );
        forkJoin(observables).subscribe({
          next: () => {

            console.log('Announcements fetched');
          },
          error: (error) => {
            console.error('Error fetching announcements:', error);
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Loading Announcements',
          detail: 'Failed to fetch announcements. Please try again later.',
        });
      },
    });

    this.options = [
      {
        label: 'Add Announcement',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/dashboard/admin/announcements'],
        tooltip: 'Create a new announcement',
        visible: role === 'ADMIN' || role === 'TEACHER', // Only show this menu item if user is admin
      },
      {
        label: 'View All Announcements',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/dashboard/admin/announcements/list'],
        tooltip: 'View all announcements',
      },
      {
        label: 'Archive',
        icon: 'pi pi-fw pi-inbox',
        routerLink: ['/dashboard/admin/announcements/archive'],
        tooltip: 'View archived announcements',
      },
      {
        separator: true,
      },
      {
        label: 'Notification Settings',
        icon: 'pi pi-fw pi-bell',
        command: () => {
          // Handle notification settings
        },
      },
      {
        label: 'Display Settings',
        icon: 'pi pi-fw pi-eye',
        command: () => {
          // Handle display settings
        },
      },
    ];
  }
}
