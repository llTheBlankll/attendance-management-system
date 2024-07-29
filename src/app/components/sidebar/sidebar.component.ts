import {Component, Input} from '@angular/core'; import {SidebarModule} from "primeng/sidebar";
import {ImageModule} from "primeng/image";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {AvatarModule} from "primeng/avatar";
import {Ripple} from "primeng/ripple";
import {BadgeModule} from "primeng/badge";
import {NgIf} from "@angular/common";

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
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input()
  public opened: boolean = false

  adminMenu?: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/dashboard/admin']
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
      routerLink: ['/dashboard/admin/classes']
    },
    {
      label: 'Subjects',
      icon: 'pi pi-fw pi-book',
      routerLink: ['/dashboard/admin/subjects']
    },
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
      command: () => {
        console.log('Logout')
      }
    }
  ]
}
