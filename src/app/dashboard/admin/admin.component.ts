import {Component, inject, OnInit} from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {BreadcrumbModule} from "primeng/breadcrumb";
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
import {
  DailyAttendanceReportCardComponent
} from "../../components/dashboard/admin/daily-attendance-report-card/daily-attendance-report-card.component";
import {UtilService} from "../../services/util/util.service";
import {ChartDays} from "../../enums/ChartDays";
import {
  SectionRankingCardComponent
} from "../../components/dashboard/admin/section-ranking-card/section-ranking-card.component";
import {BreadcrumbsService} from "../../services/breadcrumbs/breadcrumbs.service";

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
    TodayActivitiesCardComponent,
    DailyAttendanceReportCardComponent,
    SectionRankingCardComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  // Injections
  private readonly utilService = inject(UtilService);
  private readonly breadcrumbService = inject(BreadcrumbsService);

  public dailyAttendanceReportDateRange = this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS)

  ngOnInit() {
  }
}
