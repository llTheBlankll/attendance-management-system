import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-monthly-report-card',
  templateUrl: './monthly-report-card.component.html',
  styleUrls: ['./monthly-report-card.component.css'],
  standalone: true,
  imports: [CardModule, ButtonModule]
})
export class MonthlyReportCardComponent {
  generateReport() {
    // Implement report generation logic
  }
}
