import {Component, Input} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ImageModule} from "primeng/image";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {AvatarModule} from "primeng/avatar";
import {Ripple} from "primeng/ripple";
import {BadgeModule} from "primeng/badge";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {TieredMenuModule} from "primeng/tieredmenu";
import {PanelMenuModule} from "primeng/panelmenu";
import {MenubarModule} from "primeng/menubar";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ImageModule,
    MenuModule,
    AvatarModule,
    Ripple,
    BadgeModule,
    NgIf,
    DividerModule,
    TieredMenuModule,
    PanelMenuModule,
    MenubarModule,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  adminMenu?: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/dashboard/admin'],
    },
    {
      label: 'Teachers',
      icon: 'pi pi-fw pi-users',
      routerLink: ['/dashboard/admin/teachers']
    },
    {
      label: 'Students',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/dashboard/admin/students']
    },
    {
      label: 'Classes',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/dashboard/admin/classes'],
    },
    {
      label: 'Subjects',
      icon: 'pi pi-fw pi-book',
      routerLink: ['/dashboard/admin/subjects']
    },
    {
      label: "Attendance",
      icon: 'pi pi-fw pi-calendar',
      routerLink: ['/dashboard/admin/attendance']
    },
    {
      label: "Settings",
      icon: 'pi pi-fw pi-cog',
      routerLink: ['/dashboard/admin/settings']
    },
    {
      label: "Reports",
      icon: 'pi pi-fw pi-chart-bar',
      routerLink: ['/dashboard/admin/reports']
    }
  ]

  adminAvatarMenu?: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      command: () => {
        console.log('Profile')
      }
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        console.log('Settings')
      }
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      routerLink: ['/auth'],
      command: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
      }
    }
  ]
}