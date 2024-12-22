import {Component} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-daily-report-card',
  templateUrl: './daily-report-card.component.html',
  styleUrls: ['./daily-report-card.component.css'],
  standalone: true,
  imports: [CardModule, ButtonModule]
})
export class DailyReportCardComponent {
  generateReport() {
    // Implement report generation logic
  }
}
