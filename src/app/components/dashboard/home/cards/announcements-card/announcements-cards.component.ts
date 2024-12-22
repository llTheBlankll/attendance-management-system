import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {MenuModule} from 'primeng/menu';
import {PanelModule} from 'primeng/panel';
import {Announcement} from '../../../../../core/types/dto/announcement/announcement';
import {AnnouncementService} from '../../../../../core/services/announcement/announcement.service';
import {environment} from '../../../../../../environments/environment';
import {ButtonModule} from 'primeng/button';

interface ProcessedAnnouncement {
  announcement: Announcement;
  profilePictureUrl: string;
  timeUpdatedAgo: string;
}

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [CardModule, PanelModule, MenuModule, AvatarModule, ButtonModule],
  templateUrl: './announcements-cards.component.html',
  styleUrl: './announcements-cards.component.css',
})
export class AnnouncementsCardsComponent implements OnInit {
  public options: MenuItem[] = [];
  protected processedAnnouncements: ProcessedAnnouncement[] = [];

  private readonly announcementService = inject(AnnouncementService);
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
        // Set the Picture URL to each of them
        announcements.forEach((announcement: Announcement) => {
          announcement.updatedAt = new Date(announcement.updatedAt);
          announcement.createdAt = new Date(announcement.createdAt);
          this.processedAnnouncements.push({
            announcement: announcement,
            profilePictureUrl: environment.apiUrl + "/uploads/teacher/" + announcement.user.teacher?.id + "/profile-picture",
            timeUpdatedAgo: (Math.floor(announcement.createdAt.getTime() / 1000) === Math.floor(announcement.updatedAt.getTime() / 1000)) ? 'Now' : this.getTimeAgo(announcement.updatedAt),
          });
        });

        console.log(this.processedAnnouncements);
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

  private getTimeAgo(updatedAt: Date) {
    const now = new Date();
    const differenceInSeconds = Math.floor((now.getTime() - updatedAt.getTime()) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} days ago`;
    }
  }
}
