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
    tension: 0.4
  };


}
