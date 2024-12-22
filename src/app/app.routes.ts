import {Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {authGuard} from './core/guards/auth/auth.guard';
import {StrandsComponent} from './dashboard/principal/strands/strands.component';
import {AttendanceComponent} from './dashboard/public/attendances/attendance/attendance.component';
import {ClassesComponent} from './dashboard/public/classes/classes/classes.component';
import {StudentsPageComponent} from './dashboard/public/students/students-page/students-page.component';
import {GradeLevelsComponent} from './dashboard/principal/grade-levels/grade-levels.component';
import {SettingsComponent} from './dashboard/public/settings/settings/settings.component';
import {ReportsComponent} from './dashboard/public/reports/reports.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  // Region: ADMIN REGION
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/principal/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {label: 'Admin', url: '/dashboard', icon: 'pi pi-fw pi-user'},
        {
          label: 'Dashboard',
          url: '/dashboard',
          icon: 'pi pi-fw pi-home',
        },
      ],
    },
  },
  {
    path: 'dashboard/teachers',
    loadComponent: () => import('./dashboard/principal/teachers/admin-teachers/admin-teachers.component').then(m => m.AdminTeachersComponent),
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {label: 'Admin', url: '/dashboard', icon: 'pi pi-fw pi-user'},
        {
          label: 'Dashboard',
          url: '/dashboard',
          icon: 'pi pi-fw pi-home',
        },
        {
          label: 'Teachers',
          url: '/dashboard/teachers',
          icon: 'pi pi-fw pi-users',
        },
      ],
    },
  },
  // End: ADMIN REGION
  // Region: GLOBAL REGION
  {
    path: 'dashboard/students',
    component: StudentsPageComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {
          label: 'Students',
          url: '/dashboard/students',
          icon: 'pi pi-fw pi-users',
        },
        {
          label: 'Dashboard',
          url: '/dashboard/students',
          icon: 'pi pi-fw pi-home',
        },
      ],
    },
  },
  {
    path: 'dashboard/classes',
    component: ClassesComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {
          label: 'Classes',
          url: '/dashboard/classes',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Dashboard',
          url: '/dashboard/classes',
          icon: 'pi pi-fw pi-home',
        },
      ],
    },
  },
  {
    path: 'dashboard/attendances',
    component: AttendanceComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {
          label: 'Attendances',
          url: '/dashboard/attendances',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Dashboard',
          url: '/dashboard/attendances',
          icon: 'pi pi-fw pi-home',
        },
      ],
    },
  },
  {
    path: 'dashboard/strands',
    component: StrandsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {
          label: 'Strands',
          url: '/dashboard/strands',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Dashboard',
          url: '/dashboard/strands',
          icon: 'pi pi-fw pi-home',
        },
      ],
    },
  },
  {
    path: 'dashboard/reports',
    component: ReportsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {label: 'Reports', url: '/dashboard/reports', icon: 'pi pi-fw pi-chart-bar'},
      ],
    },
  },
  {
    path: 'dashboard/grade-levels',
    component: GradeLevelsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {
          label: 'Grade Levels',
          url: '/dashboard/grade-levels',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Dashboard',
          url: '/dashboard/grade-levels',
          icon: 'pi pi-fw pi-home',
        },
      ],
    },
  },
  // End: GLOBAL REGION
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        {label: 'Application', url: '/', icon: 'pi pi-fw pi-compass'},
        {label: 'Settings', url: '/settings', icon: 'pi pi-fw pi-cog'},
      ],
    },
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
