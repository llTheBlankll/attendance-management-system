import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PanelModule} from "primeng/panel";
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {ChartModule} from "primeng/chart";
import { TimeRange } from '../../../../core/enums/TimeRange';

@Component({
  selector: 'students-attendance-distribution',
  standalone: true,
  imports: [PanelModule,
    Button,
    MenuModule,
    ChartModule
  ],
  templateUrl: './student-attendance-distribution.component.html',
  styleUrl: './student-attendance-distribution.component.css'
})
export class StudentAttendanceDistributionComponent {

  @Input()
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "On Time",
        data: [92, 22, 31, 39, 65, 47, 34]
      },
      {
        label: "Late",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

  @Input()
  options = {
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Daily Attendance Report'
      },
      layout: {
        padding: 10
      },
      tooltip: {
        mode: 'index',
        intersect: true
      },
      hover: {
        mode: 'nearest',
        intersect: true
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    tension: 0.4,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }
  }

  @Output()
  public timeRange: EventEmitter<TimeRange> = new EventEmitter<TimeRange>()

  attendanceDistributionModel: MenuItem[] = [
    {
      label: "Last 30 Days",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        this.timeRange.emit(TimeRange.LAST_30_DAYS);
      }
    },
    {
      label: "Last 90 Days",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        this.timeRange.emit(TimeRange.LAST_90_DAYS);
      }
    },
    {
      label: "Last 180 Days",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        this.timeRange.emit(TimeRange.LAST_180_DAYS);
      }
    }
  ]
}
