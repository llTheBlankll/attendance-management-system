import {Component, inject} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ImageModule} from "primeng/image";
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {TieredMenuModule} from "primeng/tieredmenu";
import {ChipsModule} from "primeng/chips";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {Auth, signOut} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ImageModule,
    MenubarModule,
    AvatarModule,
    Button,
    DropdownModule,
    TieredMenuModule,
    ChipsModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  // Injections
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  adminMenu?: MenuItem[] = [
    {
      label: 'Home',
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
        signOut(this.auth).then(() => {
          this.router.navigate(['/auth']).then(() => console.log('Logout'));
        });
        console.log('Logout')
      }
    }
  ]
}
