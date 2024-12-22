import {Component, inject, OnInit} from '@angular/core';
import {ToolbarModule} from 'primeng/toolbar';
import {ImageModule} from 'primeng/image';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {DropdownModule} from 'primeng/dropdown';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ChipsModule} from 'primeng/chips';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ImageModule,
    MenubarModule,
    AvatarModule,
    DropdownModule,
    TieredMenuModule,
    ChipsModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  adminMenu?: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/dashboard/admin'],
    },
    {
      label: 'Teachers',
      icon: 'pi pi-fw pi-users',
      routerLink: ['/dashboard/admin/teachers'],
    },
    {
      label: 'Students',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/dashboard/admin/students'],
    },
    {
      label: 'Classes',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/dashboard/admin/classes'],
    },
    {
      label: 'Subjects',
      icon: 'pi pi-fw pi-book',
      routerLink: ['/dashboard/admin/subjects'],
    },
  ];
  // Profile picture
  protected PROFILE_PICTURE_URL = 'https://picsum.photos/id/1/256/256';
  // Injections
  private readonly router = inject(Router);
  adminAvatarMenu?: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      command: () => {
        console.log('Profile');
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        this.router.navigate(['/settings']);
      },
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        console.log('Logout');
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("jwt");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.router.navigate(['/login']);
      },
    },
  ];

  ngOnInit() {
    // TODO: Implement profile picture
    // this.authService.isAuthenticated().subscribe((user: User | null) => {
    //   if (user === null) {
    //     console.error('Not Logged!');
    //     return;
    //   }
    //   this.PROFILE_PICTURE_URL = user.photoURL ?? '/school-logo.png';
    // });
  }
}
