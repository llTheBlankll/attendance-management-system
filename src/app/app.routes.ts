import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { AdminComponent } from './shared/principal/admin.component';
import { StrandsComponent } from './shared/principal/strands/strands.component';
import { AdminTeachersComponent } from './shared/principal/teachers/admin-teachers/admin-teachers.component';
import { AttendanceComponent } from './shared/public/attendances/attendance/attendance.component';
import { ClassesComponent } from './shared/public/classes/classes/classes.component';
import { StudentsPageComponent } from './shared/public/students/students-page/students-page.component';
import { TeacherComponent } from './shared/teacher/teacher.component';
import { GradeLevelsComponent } from './shared/principal/grade-levels/grade-levels.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  // Region: ADMIN REGION
  {
    path: 'dashboard/admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        { label: 'Application', url: '/', icon: 'pi pi-fw pi-compass' },
        { label: 'Admin', url: '/dashboard/admin', icon: 'pi pi-fw pi-user' },
        {
          label: 'Dashboard',
          url: '/dashboard/admin',
          icon: 'pi pi-fw pi-home',
        },
      ],
    },
  },
  {
    path: 'dashboard/admin/teachers',
    component: AdminTeachersComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        { label: 'Application', url: '/', icon: 'pi pi-fw pi-compass' },
        { label: 'Admin', url: '/dashboard/admin', icon: 'pi pi-fw pi-user' },
        {
          label: 'Dashboard',
          url: '/dashboard/admin',
          icon: 'pi pi-fw pi-home',
        },
        {
          label: 'Teachers',
          url: '/dashboard/admin/teachers',
          icon: 'pi pi-fw pi-users',
        },
      ],
    },
  },
  // End: ADMIN REGION
  // Region: TEACHER REGION
  {
    path: 'dashboard/teacher',
    component: TeacherComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        { label: 'Application', url: '/' },
        { label: 'Teacher', url: '/dashboard/teacher' },
        { label: 'Dashboard', url: '/dashboard/teacher' },
      ],
    },
  },
  // End: TEACHER REGION
  // Region: GLOBAL REGION
  {
    path: 'dashboard/students',
    component: StudentsPageComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        { label: 'Application', url: '/', icon: 'pi pi-fw pi-compass' },
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
        { label: 'Application', url: '/', icon: 'pi pi-fw pi-compass' },
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
        { label: 'Application', url: '/', icon: 'pi pi-fw pi-compass' },
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
        { label: 'Application', url: '/', icon: 'pi pi-fw pi-compass' },
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
    path: 'dashboard/admin/grade-levels',
    component: GradeLevelsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: [
        { label: 'Application', url: '/', icon: 'pi pi-fw pi-compass' },
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
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
