import {Component, inject, Input, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";
import {AttendanceService} from "../../../../services/attendance/attendance.service";
import {AttendanceStatus} from "../../../../enums/AttendanceStatus";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {UtilService} from "../../../../services/util/util.service";
import {ChartDays} from "../../../../enums/ChartDays";
import {DropdownModule} from "primeng/dropdown";
import {MenuModule} from "primeng/menu";
import {PanelModule} from "primeng/panel";
import {MenuItem} from "primeng/api";
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-daily-attendance-report-card',
  standalone: true,
  imports: [
    CardModule,
    ChartModule,
    DropdownModule,
    MenuModule,
    PanelModule
  ],
  templateUrl: './daily-attendance-report-card.component.html',
  styleUrl: './daily-attendance-report-card.component.css'
})
export class DailyAttendanceReportCardComponent implements OnInit {

  // Injections
  private readonly attendanceService = inject(AttendanceService);
  private readonly utilService = inject(UtilService);

  data = {
    type: "line",
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "On Time",
        data: [92, 22, 31, 39, 65, 47, 34]
      },
      {
        label: "Late",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "Absent",
        data: [55, 59, 90, 81, 2, 25, 40],
      }
    ]
  }

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

  chartDaysOptions: MenuItem[] = [
    {
      label: 'Last 365 Days',
      command: () => {
        this.date = this.utilService.chartDaysToDateRange(ChartDays.LAST_365_DAYS);
        this.options = {
          ...this.options,
          // Set scales x type to Time
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month'
              }
            }
          }
        }
        this.updateDailyAttendanceReport();
      },
      tooltip: "This will show data for the last 365 days.",
      icon: 'pi pi-chart-line'
    },
    {
      label: 'Last 90 Days',
      command: () => {
        this.options = {
          ...this.options,
          // Set scales x type to Time
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          }
        }
        this.date = this.utilService.chartDaysToDateRange(ChartDays.LAST_90_DAYS);
        this.updateDailyAttendanceReport();
      },
      tooltip: "This will show data for the last 90 days.",
      icon: 'pi pi-chart-line'
    },
    {
      label: 'Last 30 Days',
      command: () => {
        this.date = this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS);
        this.updateDailyAttendanceReport();
      },
      tooltip: "This will show data for the last 30 days.",
      icon: 'pi pi-chart-line'
    },
    {
      label: 'Last 7 Days',
      command: () => {
        this.date = this.utilService.chartDaysToDateRange(ChartDays.LAST_7_DAYS);
        this.updateDailyAttendanceReport();
      },
      tooltip: "This will show data for the last 7 days.",
      icon: 'pi pi-chart-line'
    }
  ]

  // Date Range, default is last 30 days
  @Input()
  public date = this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS);

  private updateDailyAttendanceReport() {
    // Get the total number of on time students
    const onTimeStudentsPromise = firstValueFrom(this.attendanceService.getLineChartByAttendanceStatusAndDate(this.date, AttendanceStatus.ON_TIME));
    const lateStudentsPromise = firstValueFrom(this.attendanceService.getLineChartByAttendanceStatusAndDate(this.date, AttendanceStatus.LATE));
    const absentStudentsPromise = firstValueFrom(this.attendanceService.getLineChartByAttendanceStatusAndDate(this.date, AttendanceStatus.ABSENT));

    if (!environment.production) {
      console.log("onTimeStudentsPromise", onTimeStudentsPromise);
      console.log("lateStudentsPromise", lateStudentsPromise);
      console.log("absentStudentsPromise", absentStudentsPromise);
      console.log("Requested Days", this.date);
    }

    // Wait for all promises
    Promise.all([onTimeStudentsPromise, lateStudentsPromise, absentStudentsPromise]).then(values => {
      if (!environment.production) {
        console.log("values", values);
      }

      this.data = {
        ...this.data,
        labels: values[0].labels,
        datasets: [
          {
            ...this.data.datasets[0],
            data: values[0].data
          },
          {
            ...this.data.datasets[1],
            data: values[1].data
          },
          {
            ...this.data.datasets[2],
            data: values[2].data
          }
        ]
      }

      this.data.labels = values[0].labels;
      this.data.datasets[0].data = values[0].data;
      this.data.datasets[1].data = values[1].data;
      this.data.datasets[2].data = values[2].data;
    });
  }

  ngOnInit() {
    this.updateDailyAttendanceReport();
  }
}