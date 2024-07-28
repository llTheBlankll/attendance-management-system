import { Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./dashboard/admin/admin.component";
import {TeacherComponent} from "./dashboard/teacher/teacher.component";

export const routes: Routes = [
  {
    path: "auth", component: AuthComponent
  },
  {
    path: "dashboard/admin", component: AdminComponent
  },
  {
    path: "dashboard/teacher", component: TeacherComponent
  },
  {
    path: "**", redirectTo: "auth", pathMatch: "full"
  }
];
