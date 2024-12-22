import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {MenuModule} from 'primeng/menu';
import {PanelModule} from 'primeng/panel';
import {Announcement, AnnouncementResponse} from '../../../../../core/types/dto/announcement/announcement';
import {AnnouncementService} from '../../../../../core/services/announcement/announcement.service';
import {environment} from '../../../../../../environments/environment';
import {ButtonModule} from 'primeng/button';
import {UtilService} from "../../../../../core/services/util/util.service";
import {
  CreateAnnouncementDialogComponent
} from "./dialog/create-announcement-dialog/create-announcement-dialog.component";
import {AuthenticationService} from "../../../../../auth/authentication.service";
import {User} from "../../../../../core/types/dto/user/user";
import {AsyncPipe, DatePipe} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {SortRequest} from "../../../../../core/types/other/SortRequest";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {BehaviorSubject} from "rxjs";

interface ProcessedAnnouncement {
  announcement: Announcement;
  profilePictureUrl: string;
  timeUpdatedAgo: string;
}

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [CardModule, PanelModule, MenuModule, AvatarModule, ButtonModule, CreateAnnouncementDialogComponent, DatePipe, DividerModule, ConfirmPopupModule, AsyncPipe],
  templateUrl: './announcements-cards.component.html',
  styleUrl: './announcements-cards.component.css',
  providers: [
    ConfirmationService
  ]
})
export class AnnouncementsCardsComponent implements OnInit {
  public options: MenuItem[] = [];
  protected processedAnnouncements: ProcessedAnnouncement[] = [];
  protected processedAnnouncements$: BehaviorSubject<ProcessedAnnouncement[]> = new BehaviorSubject<ProcessedAnnouncement[]>(this.processedAnnouncements);

  // User Info
  protected userRole = localStorage.getItem('role');
  protected user?: User;
  private readonly authService = inject(AuthenticationService);
  private readonly announcementService = inject(AnnouncementService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly utilService = inject(UtilService);

  ngOnInit(): void {
    // Load announcements
    this.loadAnnouncements();

    // Get User
    this.authService.getCurrentUserAsync().subscribe({
      next: (user: User) => {
        this.user = user;
      }
    });

    // get user role for checking if user is admin
    const role = localStorage.getItem('role');

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

  public loadAnnouncements() {
    // Retrieve all announcements
    this.announcementService.getAllAnnouncement(new SortRequest("createdAt", "Descending")).subscribe({
      next: (announcements: AnnouncementResponse[]) => {
        // this.announcements = response.body ?? [];
        // Loop each announcement and add the teacher profile.
        // Set the Picture URL to each of them
        announcements.forEach((announcementResponse: AnnouncementResponse) => {
          let announcement: Announcement;
          announcement = {
            ...announcementResponse,
            updatedAt: new Date(announcementResponse.updatedAt ?? ''),
            createdAt: new Date(announcementResponse.createdAt ?? '')
          }
          console.log(announcement.createdAt);
          console.log(announcement.updatedAt);
          if (announcement.updatedAt !== undefined) {
            this.processedAnnouncements.push({
              announcement: announcement,
              profilePictureUrl: environment.apiUrl + "/uploads/teacher/" + announcement.user.teacher?.id + "/profile-picture",
              timeUpdatedAgo: this.utilService.getTimeAgo(announcement.updatedAt)
            });
          }
        });

        this.processedAnnouncements$.next(this.processedAnnouncements);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Loading Announcements',
          detail: 'Failed to fetch announcements. Please try again later.',
        });
      }
    });
  }

  public deleteAnnouncement(announcementId: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this announcement?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.announcementService.deleteAnnouncement(announcementId).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Announcement Deleted',
              detail: 'The announcement has been deleted successfully.',
            });
            // Remove the deleted announcement from the list
            const announcementIdToDelete = this.processedAnnouncements.find(announcement => announcement.announcement.id === announcementId)?.announcement.id;
            if (announcementIdToDelete) {
              const index = this.processedAnnouncements.findIndex(announcement => announcement.announcement.id === announcementIdToDelete);
              if (index > -1) {
                this.processedAnnouncements.splice(index, 1);
              }
            }

            this.processedAnnouncements$.next(this.processedAnnouncements);
          },
          error: (error: HttpErrorResponse) => {
            console.error(error.message);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Deleting Announcement',
              detail: 'Failed to delete announcement. Please try again later.',
            });
          },
        });
      }
    });
  }

  public addAnnouncement(announcement: Announcement) {
    console.debug("I GOT IT!");
    console.debug(announcement);
    const processedAnnouncement: ProcessedAnnouncement = {
      announcement: announcement,
      profilePictureUrl: environment.apiUrl + "/uploads/teacher/" + announcement.user.teacher?.id + "/profile-picture",
      timeUpdatedAgo: this.utilService.getTimeAgo(
        new Date(announcement.updatedAt ?? '')
      )
    }
    console.debug(processedAnnouncement);

    this.processedAnnouncements.unshift(processedAnnouncement);
    this.processedAnnouncements$.next(this.processedAnnouncements);
  }
}
