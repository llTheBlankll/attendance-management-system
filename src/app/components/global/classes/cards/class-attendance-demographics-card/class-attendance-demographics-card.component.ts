import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class ClassAttendanceDemographicsCardComponent implements OnChanges {

  public data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: [
          "#FF6384",
          "#36A2EB"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB"
        ]
      }
    ]
  }

  public options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  @Input()
  public sex = {
    male: 0,
    female: 0
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["sex"]) {
      this.data = {
        ...this.data,
        datasets: [
          {
            ...this.data.datasets[0],
            data: [this.sex.male, this.sex.female],
            backgroundColor: [
              "#FF6384",
              "#36A2EB"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB"
            ]
          }
        ]
      }
    }
  }
}
