import {Component} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ImageModule} from "primeng/image";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {NgOptimizedImage} from "@angular/common";
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
    BadgeModule,
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
      routerLink: ['/dashboard'],
    },
    {
      label: 'Teachers',
      icon: 'pi pi-fw pi-users',
      routerLink: ['/dashboard/teachers']
    },
    {
      label: 'Students',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/dashboard/students']
    },
    {
      label: 'Classes',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/dashboard/classes'],
    },
    {
      label: "Attendance",
      icon: 'pi pi-fw pi-calendar',
      routerLink: ['/dashboard/attendances']
    },
    {
      label: "Strands",
      icon: "pi pi-fw pi-book",
      routerLink: ['/dashboard/strands']
    },
    {
      label: "Grade Levels",
      icon: 'pi pi-fw pi-list',
      routerLink: ['/dashboard/grade-levels']
    },
    {
      label: "Reports",
      icon: 'pi pi-fw pi-chart-bar',
      routerLink: ['/dashboard/reports']
    }
  ]
}
