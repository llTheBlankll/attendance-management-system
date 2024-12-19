import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {MenuModule} from 'primeng/menu';
import {MenuItem, MessageService} from 'primeng/api';
import {AnnouncementService} from "../../../../../core/services/announcement/announcement.service";
import {Announcement} from "../../../../../core/interfaces/dto/announcement/announcement";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {User} from "../../../../../core/interfaces/dto/user/user";
import {DatePipe} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {TeacherService} from "../../../../../core/services/teacher/teacher.service";
import {firstValueFrom} from "rxjs";

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
  imports: [CardModule, PanelModule, MenuModule, DatePipe, AvatarModule],
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
    const role = localStorage.getItem("role");

    // Retrieve all announcements
    this.announcementService.getAllAnnouncement().subscribe({
      next: (response: HttpResponse<Announcement[]>) => {
        // this.announcements = response.body ?? [];
        const announcements = response.body ?? [];
        announcements.forEach((announcement) => {
          if (announcement.user.teacher !== undefined) {
            const teacherPictureBlob = this.teacherService.getTeacherProfilePicture(announcement.user.teacher.id);
            teacherPictureBlob.subscribe((pic) => {
              this.processedAnnouncement.push({
                ...announcement,
                profilePicture: pic
              });
            });
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Loading Announcements',
          detail: 'Failed to fetch announcements. Please try again later.',
        });
      }
    })

    this.options = [
      {
        label: 'Add Announcement',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/dashboard/admin/announcements'],
        tooltip: 'Create a new announcement',
        visible: role === "ADMIN" || role === "TEACHER" // Only show this menu item if user is admin
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

