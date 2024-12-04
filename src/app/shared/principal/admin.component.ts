import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { TotalStudentsCardComponent } from '../../components/admin/dashboard/cards/total-students-card/total-students-card.component';
import { OntimeStudentsCardComponent } from '../../components/admin/dashboard/cards/ontime-students-card/ontime-students-card.component';
import { LateStudentsCardComponent } from '../../components/admin/dashboard/cards/late-students-card/late-students-card.component';
import { AbsentStudentsCardComponent } from '../../components/admin/dashboard/cards/absent-students-card/absent-students-card.component';
import { TotalAttendanceReportCardComponent } from '../../components/admin/dashboard/cards/total-attendance-report-card/total-attendance-report-card.component';
import { DailyAttendanceReportCardComponent } from '../../components/admin/dashboard/cards/daily-attendance-report-card/daily-attendance-report-card.component';
import { SectionRankingCardComponent } from '../../components/admin/dashboard/cards/section-ranking-card/section-ranking-card.component';
import { AnnouncementsCardsComponent } from '../../components/admin/dashboard/cards/admin-announcements-card/announcements-cards.component';
import { UtilService } from '../../core/services/util/util.service';
import { TimeRangeConstants } from '../../core/enums/TimeRange';

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
    DailyAttendanceReportCardComponent,
    SectionRankingCardComponent,
    AnnouncementsCardsComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  // Injections
  private readonly utilService = inject(UtilService);

  public dailyAttendanceReportDateRange = this.utilService.timeRangeConstantToDateRange(
    TimeRangeConstants.LAST_30_DAYS
  );
}
