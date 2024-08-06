import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TopbarComponent} from "./components/topbar/topbar.component";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {AuthComponent} from "./auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbModule, SidebarComponent, TopbarComponent, NgTemplateOutlet, NgIf, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);

  public adminBreadCrumbItems: MenuItem[] = [
    {
      label: 'Application',
      icon: 'pi pi-fw pi-compass'
    },
    {
      label: 'Admin',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/dashboard/admin'],
    }
  ]

  private primeNgConfig = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }

  title = 'attendance-management-system';
  authenticated = true;
}
