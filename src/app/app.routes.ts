import { Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./dashboard/admin/admin.component";
import {TeacherComponent} from "./dashboard/teacher/teacher.component";
import {authGuard} from "./auth.guard";
import {AdminTeachersComponent} from "./dashboard/admin/teachers/admin-teachers/admin-teachers.component";

export const routes: Routes = [
  {
    path: "auth", component: AuthComponent
  },
  { // Region: ADMIN REGION
    path: "dashboard/admin", component: AdminComponent, canActivate: [authGuard]
  },
  {
    path: "dashboard/admin/teachers", component: AdminTeachersComponent, canActivate: [authGuard]
  }, // End: ADMIN REGION
  { // Region: TEACHER REGION
    path: "dashboard/teacher", component: TeacherComponent, canActivate: [authGuard]
  },// End: TEACHER REGION
  {
    path: "**", redirectTo: "auth", pathMatch: "full"
  }
];
