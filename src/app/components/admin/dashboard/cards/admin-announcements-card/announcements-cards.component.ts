import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [CardModule, PanelModule, MenuModule],
  templateUrl: './announcements-cards.component.html',
  styleUrl: './announcements-cards.component.css',
})
export class AnnouncementsCardsComponent {
  public options: MenuItem[] = [
    {
      label: 'Add Announcement',
      icon: 'pi pi-fw pi-plus',
      routerLink: ['/dashboard/admin/announcements'],
      tooltip: 'Create a new announcement',
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
