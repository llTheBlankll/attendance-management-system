import {Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {authGuard} from './core/guards/auth/auth.guard';

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
    loadComponent: () => import('./dashboard/public/students/students-page/students-page.component').then(m => m.StudentsPageComponent),
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
    loadComponent: () => import('./dashboard/public/classes/classes/classes.component').then(m => m.ClassesComponent),
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
    loadComponent: () => import('./dashboard/public/attendances/attendance/attendance.component').then(m => m.AttendanceComponent),
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
    loadComponent: () => import('./dashboard/principal/strands/strands.component').then(m => m.StrandsComponent),
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
    loadComponent: () => import('./dashboard/public/reports/reports.component').then(m => m.ReportsComponent),
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
    loadComponent: () => import('./dashboard/principal/grade-levels/grade-levels.component').then(m => m.GradeLevelsComponent),
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
    loadComponent: () => import('./dashboard/public/settings/settings/settings.component').then(m => m.SettingsComponent),
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
