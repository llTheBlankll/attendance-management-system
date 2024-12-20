import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { MenuItem } from 'primeng/api';
import 'chartjs-adapter-moment';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { firstValueFrom } from 'rxjs';
import { AttendanceStatus } from '../../../../../core/enums/AttendanceStatus';
import { TimeRangeConstants } from '../../../../../core/enums/TimeRange';
import { TimeStack } from '../../../../../core/enums/TimeStack';
import { AttendanceService } from '../../../../../core/services/attendance/attendance.service';
import { UtilService } from '../../../../../core/services/util/util.service';

@Component({
  selector: 'app-daily-attendance-report-card',
  standalone: true,
  imports: [
    CardModule,
    ChartModule,
    DropdownModule,
    MenuModule,
    PanelModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './daily-attendance-report-card.component.html',
  styleUrl: './daily-attendance-report-card.component.css',
})
export class DailyAttendanceReportCardComponent implements OnInit {
  // Injections
  private readonly attendanceService = inject(AttendanceService);
  private readonly utilService = inject(UtilService);

  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'On Time',
        data: [92, 22, 31, 39, 65, 47, 34],
      },
      {
        label: 'Late',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'Absent',
        data: [55, 59, 90, 81, 2, 25, 40],
      },
    ],
  };

  options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Daily Attendance Report',
      },
      layout: {
        padding: 10,
      },
      tooltip: {
        mode: 'index',
        intersect: true,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    tension: 0.4,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  chartDaysOptions: MenuItem[] = [
    {
      label: 'Last 365 Days',
      command: () => {
        this.date = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_365_DAYS
        );
        this.options = {
          ...this.options,
          // Set scales x type to Time
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
          },
        };
        this.updateDailyAttendanceReport(TimeStack.MONTH);
      },
      tooltip: 'This will show data for the last 365 days.',
      icon: 'pi pi-chart-line',
    },
    {
      label: 'Last 90 Days',
      command: () => {
        this.options = {
          ...this.options,
          // Set scales x type to Time
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
          },
        };
        this.date = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_90_DAYS
        );
        this.updateDailyAttendanceReport(TimeStack.WEEK);
      },
      tooltip: 'This will show data for the last 90 days.',
      icon: 'pi pi-chart-line',
    },
    {
      label: 'Last 30 Days',
      command: () => {
        this.date = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_30_DAYS
        );
        this.updateDailyAttendanceReport(TimeStack.WEEK);
      },
      tooltip: 'This will show data for the last 30 days.',
      icon: 'pi pi-chart-line',
    },
    {
      label: 'Last 7 Days',
      command: () => {
        this.date = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_7_DAYS
        );
        this.updateDailyAttendanceReport(TimeStack.DAY);
      },
      tooltip: 'This will show data for the last 7 days.',
      icon: 'pi pi-chart-line',
    },
  ];

  // Date Range, default is last 30 days
  @Input()
  public date = this.utilService.timeRangeConstantToDateRange(TimeRangeConstants.LAST_30_DAYS);

  protected loading = false;

  private updateDailyAttendanceReport(timeStack = TimeStack.WEEK) {
    this.loading = true;
    const onTime = firstValueFrom(
      this.attendanceService.getLineChart(
        this.date,
        [AttendanceStatus.ON_TIME],
        timeStack
      )
    );
    const late = firstValueFrom(
      this.attendanceService.getLineChart(
        this.date,
        [AttendanceStatus.LATE],
        timeStack
      )
    );
    const absent = firstValueFrom(
      this.attendanceService.getLineChart(
        this.date,
        [AttendanceStatus.ABSENT],
        timeStack
      )
    );

    Promise.all([onTime, late, absent]).then((values) => {
      this.data = {
        ...this.data,
        labels: values[0].labels,
        datasets: [
          {
            label: 'On Time',
            data: values[0].data,
          },
          {
            label: 'Late',
            data: values[1].data,
          },
          {
            label: 'Absent',
            data: values[2].data,
          },
        ],
      };
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.updateDailyAttendanceReport();
  }
}
