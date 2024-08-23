import {Component} from '@angular/core';
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

  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Late",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "On Time",
        data: [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label: "Absent",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    tension: 0.4
  };
}
