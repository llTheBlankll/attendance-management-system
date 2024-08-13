import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TopbarComponent} from "./components/topbar/topbar.component";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {AuthComponent} from "./auth/auth.component";
import {AuthenticationService} from "./auth/authentication.service";
import {ToastModule} from "primeng/toast";
import {BreadcrumbsService} from "./services/breadcrumbs/breadcrumbs.service";
import {filter, Subject, takeUntil} from "rxjs";

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
  private readonly router = inject(Router);
  protected readonly breadcrumbsService = inject(BreadcrumbsService);
  private primeNgConfig = inject(PrimeNGConfig);

  // * Authentication
  public authenticated = {
    authenticated: false,
    role: sessionStorage.getItem("role") ?? "GUEST"
  };

  // Breadcrumbs
  private ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;

    // Navigation Listener
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(_ => {
        const breadcrumbs: MenuItem[] = [];
        let currentRoute: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
        while (currentRoute) {
          if (currentRoute.routeConfig && currentRoute.routeConfig.data && currentRoute.routeConfig.data["breadcrumb"]) {
            breadcrumbs.push(...currentRoute.routeConfig.data["breadcrumb"]);
          }
          currentRoute = currentRoute.firstChild;
        }
        this.breadcrumbsService.updateBreadcrumbs(breadcrumbs);
      });

    // Check if authenticated
    this.authenticated = {
      authenticated: this.authService.isAuthenticated(),
      role: sessionStorage.getItem("role") ?? "GUEST"
    };
  }
}
