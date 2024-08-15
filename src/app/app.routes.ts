import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./dashboard/admin/admin.component";
import {TeacherComponent} from "./dashboard/teacher/teacher.component";
import {authGuard} from "./auth.guard";
import {AdminTeachersComponent} from "./dashboard/admin/teachers/admin-teachers/admin-teachers.component";
import {StudentsPageComponent} from "./dashboard/global/students/students-page/students-page.component";
import {ClassesComponent} from "./dashboard/global/classes/classes/classes.component";
import {AdminSubjectsComponent} from "./dashboard/admin/subjects/admin-subjects.component";
import {AttendanceComponent} from "./dashboard/global/attendances/attendance/attendance.component";

export const routes: Routes = [
  {
    path: "auth", component: AuthComponent
  },
  // Region: ADMIN REGION
  {
    path: "dashboard/admin", component: AdminComponent, canActivate: [authGuard], data: {
      breadcrumb: [
        {label: "Application", url: "/", icon: "pi pi-fw pi-compass"},
        {label: "Admin", url: "/dashboard/admin", icon: "pi pi-fw pi-user"},
        {label: "Dashboard", url: "/dashboard/admin", icon: "pi pi-fw pi-home"},
      ]
    }
  },
  {
    path: "dashboard/admin/teachers", component: AdminTeachersComponent, canActivate: [authGuard], data: {
      breadcrumb: [
        {label: "Application", url: "/", icon: "pi pi-fw pi-compass"},
        {label: "Admin", url: "/dashboard/admin", icon: "pi pi-fw pi-user"},
        {label: "Dashboard", url: "/dashboard/admin", icon: "pi pi-fw pi-home"},
        {label: "Teachers", url: "/dashboard/admin/teachers", icon: "pi pi-fw pi-users"},
      ]
    }
  },
  {
    path: "dashboard/admin/subjects", component: AdminSubjectsComponent, canActivate: [authGuard], data: {
      breadcrumb: [
        {label: "Application", url: "/", icon: "pi pi-fw pi-compass"},
        {label: "Admin", url: "/dashboard/admin", icon: "pi pi-fw pi-user"},
        {label: "Dashboard", url: "/dashboard/admin", icon: "pi pi-fw pi-home"},
        {label: "Subjects", url: "/dashboard/admin/subjects", icon: "pi pi-fw pi-book"},
      ]
    }
  },
  // End: ADMIN REGION
  // Region: TEACHER REGION
  {
    path: "dashboard/teacher", component: TeacherComponent, canActivate: [authGuard], data: {
      breadcrumb: [
        {label: "Application", url: "/"},
        {label: "Teacher", url: "/dashboard/teacher"},
        {label: "Dashboard", url: "/dashboard/teacher"}
      ]
    }
  },
  // End: TEACHER REGION
  // Region: GLOBAL REGION
  {
    path: "dashboard/students", component: StudentsPageComponent, canActivate: [authGuard], data: {
      breadcrumb: [
        {label: "Application", url: "/", icon: "pi pi-fw pi-compass"},
        {label: "Students", url: "/dashboard/students", icon: "pi pi-fw pi-users"},
        {label: "Dashboard", url: "/dashboard/students", icon: "pi pi-fw pi-home"},
      ]
    }
  },
  {
    path: "dashboard/classes", component: ClassesComponent, canActivate: [authGuard], data: {
      breadcrumb: [
        {label: "Application", url: "/", icon: "pi pi-fw pi-compass"},
        {label: "Classes", url: "/dashboard/classes", icon: "pi pi-fw pi-list"},
        {label: "Dashboard", url: "/dashboard/classes", icon: "pi pi-fw pi-home"},
      ]
    }
  },
  {
    path: "dashboard/attendances", component: AttendanceComponent, canActivate: [authGuard], data: {
      breadcrumb: [
        {label: "Application", url: "/", icon: "pi pi-fw pi-compass"},
        {label: "Attendances", url: "/dashboard/attendances", icon: "pi pi-fw pi-list"},
        {label: "Dashboard", url: "/dashboard/attendances", icon: "pi pi-fw pi-home"},
      ]
    }
  },
  // End: GLOBAL REGION
  {
    path: "**", redirectTo: "auth", pathMatch: "full"
  }
];
