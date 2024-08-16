import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'classes-attendance-demographics-card',
  standalone: true,
  imports: [
    CardModule,
    ChartModule
  ],
  templateUrl: './class-attendance-demographics-card.component.html',
  styleUrl: './class-attendance-demographics-card.component.css'
})
export class ClassAttendanceDemographicsCardComponent {

  public data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [30, 17],
        backgroundColor: [
          "#FF6384",
          "#36A2EB"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB"
        ]
      }]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    // Add Label
  }
}
