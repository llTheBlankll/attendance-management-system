import { Component } from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {TopbarComponent} from "../../components/topbar/topbar.component";
import {
  TotalStudentsCardComponent
} from "../../components/dashboard/admin/total-students-card/total-students-card.component";
import {
  OntimeStudentsCardComponent
} from "../../components/dashboard/admin/ontime-students-card/ontime-students-card.component";
import {
  LateStudentsCardComponent
} from "../../components/dashboard/admin/late-students-card/late-students-card.component";
import {
  AbsentStudentsCardComponent
} from "../../components/dashboard/admin/absent-students-card/absent-students-card.component";
import {
  TotalAttendanceReportCardComponent
} from "../../components/dashboard/admin/total-attendance-report-card/total-attendance-report-card.component";
import {
  TopStudentsListCardComponent
} from "../../components/dashboard/admin/top-students-list-card/top-students-list-card.component";
import {
  TodayActivitiesCardComponent
} from "../../components/dashboard/admin/today-activities-card/today-activities-card.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SidebarComponent,
    BreadcrumbModule,
    TopbarComponent,
    TotalStudentsCardComponent,
    OntimeStudentsCardComponent,
    LateStudentsCardComponent,
    AbsentStudentsCardComponent,
    TotalAttendanceReportCardComponent,
    TopStudentsListCardComponent,
    TodayActivitiesCardComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  public breadcrumbItems: MenuItem[] = [
    {
      label: 'Application',
      icon: 'pi pi-fw pi-compass',
    },
    {
      label: 'Admin',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
    }
  ]
}
