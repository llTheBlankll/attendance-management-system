import {Component, inject, Input, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";
import {AttendanceService} from "../../../../services/attendance/attendance.service";
import {UtilService} from "../../../../services/util/util.service";
import {ChartDays} from "../../../../enums/ChartDays";
import {catchError} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {LineChartDTO} from "../../../../interfaces/LineChartDTO";
import {environment} from "../../../../../environments/environment";
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {DateRange} from "../../../../interfaces/DateRange";

@Component({
  selector: 'app-total-attendance-report-card',
  standalone: true,
  imports: [
    CardModule,
    ChartModule,
    PanelModule,
    MenuModule
  ],
  templateUrl: './total-attendance-report-card.component.html',
  styleUrl: './total-attendance-report-card.component.css'
})
export class TotalAttendanceReportCardComponent implements OnInit {

  // Injections
  private readonly attendanceService = inject(AttendanceService);
  private readonly utilService = inject(UtilService);

  public data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [0],
        borderColor: '#42A5F5',
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
    aspectRatio: 1,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    },
    tension: 0.4
  }

  public totalAttendance = 0;

  @Input()
  public dateRange = this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS);

  public chartDaysOptions: MenuItem[] = [
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
                unit: 'month'
              }
            }
          }
        }
        this.dateRange = this.utilService.chartDaysToDateRange(ChartDays.LAST_90_DAYS);
        this.updateTotalAttendanceReport();
      },
      tooltip: "This will show data for the last 90 days.",
      icon: 'pi pi-chart-line'
    },
    {
      label: 'Last 30 Days',
      command: () => {
        this.dateRange = this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS);
        this.updateTotalAttendanceReport();
      },
      tooltip: "This will show data for the last 30 days.",
      icon: 'pi pi-chart-line'
    },
    {
      label: 'Last 7 Days',
      command: () => {
        this.dateRange = this.utilService.chartDaysToDateRange(ChartDays.LAST_7_DAYS);
        this.updateTotalAttendanceReport();
      },
      tooltip: "This will show data for the last 7 days.",
      icon: 'pi pi-chart-line'
    }
  ]

  public updateTotalAttendanceReport() {
    // Get the on time and late students and add together
    const lineChartDTO: LineChartDTO = this.attendanceService.getLineChartOfTotalAttendance(this.dateRange);

    this.data = {
      ...this.data,
      labels: lineChartDTO.labels,
      datasets: [
        {
          ...this.data.datasets[0],
          data: lineChartDTO.data
        }
      ]
    };
  }

  ngOnInit() {
    this.updateTotalAttendanceReport();
  }
}
