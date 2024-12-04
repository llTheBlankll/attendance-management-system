import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AttendanceStatus } from '../../../../../core/enums/AttendanceStatus';
import { TimeRangeConstants } from '../../../../../core/enums/TimeRange';
import { TimeStack } from '../../../../../core/enums/TimeStack';
import { AttendanceService } from '../../../../../core/services/attendance/attendance.service';
import { UtilService } from '../../../../../core/services/util/util.service';

@Component({
  selector: 'app-total-attendance-report-card',
  standalone: true,
  imports: [
    CardModule,
    ChartModule,
    PanelModule,
    MenuModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './total-attendance-report-card.component.html',
  styleUrl: './total-attendance-report-card.component.css',
})
export class TotalAttendanceReportCardComponent implements OnInit {
  // Injections
  private readonly attendanceService = inject(AttendanceService);
  private readonly utilService = inject(UtilService);

  public loading = false;

  public data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [0],
        borderColor: '#42A5F5',
      },
    ],
  };

  options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    tension: 0.4,
  };

  @Input()
  public dateRange = this.utilService.timeRangeConstantToDateRange(
    TimeRangeConstants.LAST_30_DAYS
  );

  public chartDaysOptions: MenuItem[] = [
    {
      label: 'Last Year',
      command: () => {
        this.options = {
          ...this.options,
        };
        this.dateRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_365_DAYS
        );
        this.updateTotalAttendanceReport(TimeStack.MONTH);
      },
      tooltip: 'This will show data for the last 365 days.',
      icon: 'pi pi-chart-line',
    },
    {
      label: 'Last 90 Days',
      command: () => {
        this.options = {
          ...this.options,
        };
        this.dateRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_90_DAYS
        );
        this.updateTotalAttendanceReport(TimeStack.MONTH);
      },
      tooltip: 'This will show data for the last 90 days.',
      icon: 'pi pi-chart-line',
    },
    {
      label: 'Last 30 Days',
      command: () => {
        this.dateRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_30_DAYS
        );
        this.updateTotalAttendanceReport(TimeStack.DAY);
      },
      tooltip: 'This will show data for the last 30 days.',
      icon: 'pi pi-chart-line',
    },
    {
      label: 'Last 7 Days',
      command: () => {
        this.dateRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_7_DAYS
        );
        this.updateTotalAttendanceReport(TimeStack.DAY);
      },
      tooltip: 'This will show data for the last 7 days.',
      icon: 'pi pi-chart-line',
    },
  ];

  public updateTotalAttendanceReport(timeStack: TimeStack = TimeStack.WEEK) {
    // Get the on time and late students and add together
    this.loading = true;
    const lineChartObservable = this.attendanceService.getLineChart(
      this.dateRange,
      [AttendanceStatus.LATE, AttendanceStatus.ON_TIME],
      timeStack
    );
    lineChartObservable.subscribe((lineChartDTO) => {
      this.data = {
        ...this.data,
        labels: lineChartDTO.labels,
        datasets: [
          {
            ...this.data.datasets[0],
            data: lineChartDTO.data,
          },
        ],
      };
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.updateTotalAttendanceReport();
  }
}
