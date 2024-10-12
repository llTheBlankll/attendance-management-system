import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'classes-monthly-attendance-card',
  standalone: true,
  imports: [
    CardModule,
    ChartModule
  ],
  templateUrl: './class-monthly-attendance-card.component.html',
  styleUrl: './class-monthly-attendance-card.component.css'
})
export class ClassMonthlyAttendanceCardComponent {

  @Input()
  data = {};

  options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    tension: 0.4,
    // Show 0 values
    elements: {
      line: {
        tension: 0.4,
        fill: false,
        pointHitRadius: 0
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Attendance'
      },
      layout: {
        padding: 10
      },
      tooltip: {
        enabled: true
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
    }
  };


}
