import { Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./dashboard/admin/admin.component";
import {TeacherComponent} from "./dashboard/teacher/teacher.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  {
    path: "auth", component: AuthComponent
  },
  {
    path: "dashboard/admin", component: AdminComponent, canActivate: [authGuard]
  },
  {
    path: "dashboard/teacher", component: TeacherComponent, canActivate: [authGuard]
  },
  {
    path: "**", redirectTo: "auth", pathMatch: "full"
  }
];
