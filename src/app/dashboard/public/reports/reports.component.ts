import {Component} from '@angular/core';
import {DailyReportCardComponent} from './cards/daily-report-card/daily-report-card.component';
import {WeeklyReportCardComponent} from './cards/weekly-report-card/weekly-report-card.component';
import {MonthlyReportCardComponent} from './cards/monthly-report-card/monthly-report-card.component';
import {StudentReportCardComponent} from './cards/student-report-card/student-report-card.component';
import {CustomReportCardComponent} from './cards/custom-report-card/custom-report-card.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: true,
  imports: [
    DailyReportCardComponent,
    WeeklyReportCardComponent,
    MonthlyReportCardComponent,
    StudentReportCardComponent,
    CustomReportCardComponent
  ]
})
export class ReportsComponent {
  // You can add any shared logic or data here if needed
}
