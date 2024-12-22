import {Injectable} from '@angular/core';
import {TimeRangeConstants} from '../../types/enums/TimeRange';
import {TimeRange} from '../../types/other/DateRange';
import {AttendanceStatus} from '../../types/enums/AttendanceStatus';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public getTimeAgo(updatedAt: Date) {
    const now = new Date();
    const differenceInSeconds = Math.floor(
      (now.getTime() - updatedAt.getTime()) / 1000
    );

    // Add this check
    if (differenceInSeconds < 0) {
      return 'Just now'; // or 'Recently updated' or whatever makes sense
    }

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} days ago`;
    }
  }

  public getCurrentWeekOfMonth(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return Math.ceil((date.getDate() + firstDayOfMonth.getDay() - 1) / 7);
  }

  public loadSchoolYearOptions() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 1;
    const schoolYearOptions = [];

    for (let year = startYear; year <= endYear; year++) {
      schoolYearOptions.push({label: `${year}-${year + 1}`, value: `${year}-${year + 1}`});
    }

    return schoolYearOptions;
  }

  public attendanceStatusListToString(statusList: AttendanceStatus[]): string {
    return statusList.join(',');
  }

  public getMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Adjust for 0-indexing

    return date.toLocaleString('en-US', {month: 'long'});
  }

  /**
   * Returns the number of days between two dates
   * @param dateRange Date range
   * @returns The number of days between the start and end dates
   */
  public getDaysCount(dateRange: TimeRange) {
    return Math.ceil(
      Math.abs(dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

  /**
   * Converting chart days to date range, they could be today, last 7 days, last 30 days, last 90 days, last 365 days.
   * And it will return the date range based on the chart days
   *
   * @param timeRange
   */
  public timeRangeConstantToDateRange(timeRange: TimeRangeConstants) {
    const currentDate = new Date();
    const dateRanges = {
      [TimeRangeConstants.TODAY]: 0,
      [TimeRangeConstants.LAST_7_DAYS]: 7,
      [TimeRangeConstants.LAST_30_DAYS]: 30,
      [TimeRangeConstants.LAST_90_DAYS]: 90,
      [TimeRangeConstants.LAST_180_DAYS]: 180,
      [TimeRangeConstants.LAST_365_DAYS]: 365,
    };

    const daysToSubtract = dateRanges[timeRange] ?? 0;
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - daysToSubtract);

    return new TimeRange(startDate, currentDate);
  }
}
