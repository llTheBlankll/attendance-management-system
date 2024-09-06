import {Injectable} from '@angular/core';
import {TimeRange} from "../../enums/TimeRange";
import {DateRange} from "../../interfaces/DateRange";
import {Timestamp} from "@angular/fire/firestore";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  /**
   * Formatting Date into YYYY-MM-DD
   *
   * @param date Date that will be formatted
   * @returns {string} that is in format YYYY-MM-DD
   */
  public formatDateToLocalDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  public getCurrentWeekOfMonth(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return Math.ceil((date.getDate() + firstDayOfMonth.getDay() - 1) / 7);
  }

  public getCurrentMonth(date: Date) {
    return date.getMonth() + 1;
  }

  public getMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Adjust for 0-indexing

    return date.toLocaleString('en-US', { month: 'long' });
  }

  public dateToTimestamp(date: DateRange | Date): [Timestamp, Timestamp] {
    if (date == null) {
      return [Timestamp.fromDate(new Date()), Timestamp.fromDate(new Date())];
    }

    if (date instanceof Date) {
      // Ensure the date is in UTC to avoid timezone issues
      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
      return [Timestamp.fromDate(start), Timestamp.fromDate(end)];
    } else { // Set the date of the startDate from dateRange variable to 00:00:00
      const start = new Date(date.startDate.getFullYear(), date.startDate.getMonth(), date.startDate.getDate());
      start.setUTCHours(0, 0, 0, 999);
      const end = new Date(date.endDate.getFullYear(), date.endDate.getMonth(), date.endDate.getDate());
      end.setUTCHours(23, 59, 59, 999);
      return [Timestamp.fromDate(start), Timestamp.fromDate(end)];

    }
  }

  /**
   * Returns the number of days between two dates
   * @param dateRange Date range
   * @returns The number of days between the start and end dates
   */
  public getDaysCount(dateRange: DateRange) {
    return Math.ceil(Math.abs(dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  /**
   * Converting chart days to date range, they could be today, last 7 days, last 30 days, last 90 days, last 365 days.
   * And it will return the date range based on the chart days
   *
   * @param timeRange
   */
  public timeRangeToDateRange(timeRange: TimeRange) {
    const currentDate = new Date();

    // Get the date range based on the chart days.
    switch (timeRange) {
      case TimeRange.TODAY: {
        return new DateRange(currentDate, currentDate);
      }
      case TimeRange.LAST_7_DAYS: {
        // Subtract 7 days from the current date
        const last7Days = new Date(currentDate);
        last7Days.setDate(currentDate.getDate() - 7);
        return new DateRange(last7Days, currentDate);
      }
      case TimeRange.LAST_30_DAYS: {
        // Subtract 30 days from the current date
        const last30Days = new Date(currentDate);
        last30Days.setDate(currentDate.getDate() - 30);
        return new DateRange(last30Days, currentDate);
      }
      case TimeRange.LAST_90_DAYS: {
        // Subtract 90 days from the current date
        const last90Days = new Date(currentDate);
        last90Days.setDate(currentDate.getDate() - 90);
        return new DateRange(last90Days, currentDate);
      }
      case TimeRange.LAST_180_DAYS: {
        // Subtract 180 days from the current date
        const last180Days = new Date(currentDate);
        last180Days.setDate(currentDate.getDate() - 180);
        return new DateRange(last180Days, currentDate);
      }
      case TimeRange.LAST_365_DAYS: {
        // Subtract 365 days from the current date
        const last365Days = new Date(currentDate);
        last365Days.setDate(currentDate.getDate() - 365);
        return new DateRange(last365Days, currentDate);
      }
      default: {
        return new DateRange(currentDate, currentDate);
      }
    }
  }
}
