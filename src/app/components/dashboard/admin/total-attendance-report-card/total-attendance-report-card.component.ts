import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-total-attendance-report-card',
  standalone: true,
  imports: [
    CardModule,
    ChartModule
  ],
  templateUrl: './total-attendance-report-card.component.html',
  styleUrl: './total-attendance-report-card.component.css'
})
export class TotalAttendanceReportCardComponent {

  public data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#42A5F5',
        tension: .4
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#FFA726',
        tension: .4
      }
    ]
  };

  options = {
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1
  }
}
