import {NgIf, NgTemplateOutlet} from '@angular/common';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ToastModule} from 'primeng/toast';
import {filter, Subject} from 'rxjs';
import {AuthComponent} from './auth/auth.component';
import {AuthenticationService} from './auth/authentication.service';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {CodeStatus} from './core/enums/CodeStatus';
import {MessageDTO} from './core/interfaces/MessageDTO';
import {BreadcrumbService} from './core/services/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BreadcrumbModule,
    SidebarComponent,
    TopbarComponent,
    ToastModule,
  ],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // Injections
  private readonly authService = inject(AuthenticationService);
  protected readonly breadcrumbService = inject(BreadcrumbService);

  private readonly router = inject(Router);
  private primeNgConfig = inject(PrimeNGConfig);

  // * Authentication
  public authenticated = {
    authenticated: false,
    role: sessionStorage.getItem('role') ?? 'GUEST',
  };

  // Breadcrumbs
  ngOnInit(): void {
    this.primeNgConfig.ripple = true;

    // Navigation Listener
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((_) => {
        const breadcrumbs: MenuItem[] = [];
        let currentRoute: ActivatedRouteSnapshot | null =
          this.router.routerState.snapshot.root;
        while (currentRoute) {
          if (
            currentRoute.routeConfig &&
            currentRoute.routeConfig.data &&
            currentRoute.routeConfig.data['breadcrumb']
          ) {
            breadcrumbs.push(...currentRoute.routeConfig.data['breadcrumb']);
          }
          currentRoute = currentRoute.firstChild;
        }
        this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
      });

    // Check if authenticated
    this.authService.isAuthenticated().subscribe({
      next: (response: HttpResponse<MessageDTO>) => {
        const message = response.body ?? { status: CodeStatus.OK, message: '' };
        if (message.status === CodeStatus.OK) {
          this.authenticated.authenticated = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        const message = error.error as MessageDTO;
        // * Failed status is a expired token
        if (message.status === CodeStatus.FAILED) {
          console.info('Token expired');
          this.authenticated.authenticated = false;
          this.authenticated.role = 'GUEST';
        }

        this.router
          .navigate(['/auth'])
          .then((r) => console.debug(`Navigating to error: ${r}`));
      },
      complete: () => console.debug('Authentication check completed'),
    });
  }
}
