import {Injectable} from '@angular/core';
import {ChartDays} from "../../enums/ChartDays";
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
   * Converting chart days to date range, they could be today, last 7 days, last 30 days, last 90 days, last 365 days.
   * And it will return the date range based on the chart days
   *
   * @param chartDays
   */
  public chartDaysToDateRange(chartDays: ChartDays) {
    const currentDate = new Date();

    // Get the date range based on the chart days.
    switch (chartDays) {
      case ChartDays.TODAY: {
        return new DateRange(currentDate, currentDate);
      }
      case ChartDays.LAST_7_DAYS: {
        // Subtract 7 days from the current date
        const last7Days = new Date(currentDate);
        last7Days.setDate(currentDate.getDate() - 7);
        return new DateRange(last7Days, currentDate);
      }
      case ChartDays.LAST_30_DAYS: {
        // Subtract 30 days from the current date
        const last30Days = new Date(currentDate);
        last30Days.setDate(currentDate.getDate() - 30);
        return new DateRange(last30Days, currentDate);
      }
      case ChartDays.LAST_90_DAYS: {
        // Subtract 90 days from the current date
        const last90Days = new Date(currentDate);
        last90Days.setDate(currentDate.getDate() - 90);
        return new DateRange(last90Days, currentDate);
      }
      case ChartDays.LAST_365_DAYS: {
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
