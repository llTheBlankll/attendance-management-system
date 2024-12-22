import {Component, inject} from '@angular/core';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {
  TotalStudentsCardComponent
} from '../../components/dashboard/home/cards/total-students-card/total-students-card.component';
import {
  OntimeStudentsCardComponent
} from '../../components/dashboard/home/cards/ontime-students-card/ontime-students-card.component';
import {
  LateStudentsCardComponent
} from '../../components/dashboard/home/cards/late-students-card/late-students-card.component';
import {
  AbsentStudentsCardComponent
} from '../../components/dashboard/home/cards/absent-students-card/absent-students-card.component';
import {
  TotalAttendanceReportCardComponent
} from '../../components/dashboard/home/cards/total-attendance-report-card/total-attendance-report-card.component';
import {
  DailyAttendanceReportCardComponent
} from '../../components/dashboard/home/cards/daily-attendance-report-card/daily-attendance-report-card.component';
import {
  SectionRankingCardComponent
} from '../../components/dashboard/home/cards/section-ranking-card/section-ranking-card.component';
import {
  AnnouncementsCardsComponent
} from '../../components/dashboard/home/cards/announcements-card/announcements-cards.component';
import {UtilService} from '../../core/services/util/util.service';
import {TimeRangeConstants} from '../../core/types/enums/TimeRange';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TotalStudentsCardComponent,
    OntimeStudentsCardComponent,
    LateStudentsCardComponent,
    AbsentStudentsCardComponent,
    TotalAttendanceReportCardComponent,
    DailyAttendanceReportCardComponent,
    SectionRankingCardComponent,
    AnnouncementsCardsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // Injections
  private readonly utilService = inject(UtilService);

  public dailyAttendanceReportDateRange =
    this.utilService.timeRangeConstantToDateRange(
      TimeRangeConstants.LAST_30_DAYS
    );
}
