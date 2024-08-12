import {Component, inject, Injectable, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TopbarComponent} from "./components/topbar/topbar.component";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {AuthComponent} from "./auth/auth.component";
import {AuthenticationService} from "./auth/authentication.service";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbModule, SidebarComponent, TopbarComponent, NgTemplateOutlet, NgIf, AuthComponent, ToastModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // Injections
  private readonly authService = inject(AuthenticationService);

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
  public authenticated = {
    authenticated: false,
    role: sessionStorage.getItem("role") ?? "GUEST"
  };

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;

    // Check if authenticated
    this.authenticated = {
      authenticated: this.authService.isAuthenticated(),
      role: sessionStorage.getItem("role") ?? "GUEST"
    };
  }

  title = 'attendance-management-system';
}
