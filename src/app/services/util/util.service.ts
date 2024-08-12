import { Injectable } from '@angular/core';
import {ChartDays} from "../../enums/ChartDays";
import {DateRange} from "../../interfaces/DateRange";
import {Timestamp} from "@angular/fire/firestore";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public formatDateToLocalDate(date: Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  }

  /**
   * In Firebase you can't exactly compare the date because it also includes the time of the Date.
   * Sometimes we only want to compare the date and not the time. So we need to query between two dates.
   * The date that has 00:00:00 and the date that has 23:59:59 will be used.
   *
   * @param date
   * @return {[Timestamp, Timestamp]}
   */
  public dateToDateRange(date: Date): [Timestamp, Timestamp] {
    if (date == null) {
      if (!environment.production) {
        console.log("date is null, setting today instead...");
      }
      return [Timestamp.fromDate(new Date()), Timestamp.fromDate(new Date())];
    }

    // Ensure the date is in UTC to avoid timezone issues
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    return [Timestamp.fromDate(start), Timestamp.fromDate(end)];
  }

  public dateRangeToDateRange(dateRange: DateRange): [Timestamp, Timestamp] {
    if (dateRange == null) {
      return [Timestamp.fromDate(new Date()), Timestamp.fromDate(new Date())];
    }

    // Set the date of the startDate from dateRange variable to 00:00:00
    const start = new Date(dateRange.startDate.getFullYear(), dateRange.startDate.getMonth(), dateRange.startDate.getDate());
    start.setUTCHours(0, 0, 0, 999);
    // Set the date of the endDate from dateRange variable to 23:59:59
    const end = new Date(dateRange.endDate.getFullYear(), dateRange.endDate.getMonth(), dateRange.endDate.getDate());
    end.setUTCHours(23, 59, 59, 999);

    return [Timestamp.fromDate(start), Timestamp.fromDate(end)];
  }

  public chartDaysToDateRange(chartDays: ChartDays) {
    const currentDate = new Date();

    // Get the date range based on the chart days.
    switch (chartDays) {
      case ChartDays.TODAY:
        return new DateRange(currentDate, currentDate);
      case ChartDays.LAST_7_DAYS:
        // Subtract 7 days from the current date
        const last7Days = new Date(currentDate);
        last7Days.setDate(currentDate.getDate() - 7);
        return new DateRange(last7Days, currentDate);
      case ChartDays.LAST_30_DAYS:
        // Subtract 30 days from the current date
        const last30Days = new Date(currentDate);
        last30Days.setDate(currentDate.getDate() - 30);
        return new DateRange(last30Days, currentDate);
      case ChartDays.LAST_90_DAYS:
        // Subtract 90 days from the current date
        const last90Days = new Date(currentDate);
        last90Days.setDate(currentDate.getDate() - 90);
        return new DateRange(last90Days, currentDate);
      case ChartDays.LAST_365_DAYS:
        // Subtract 365 days from the current date
        const last365Days = new Date(currentDate);
        last365Days.setDate(currentDate.getDate() - 365);
        return new DateRange(last365Days, currentDate);
      default:
        return new DateRange(currentDate, currentDate);
    }
  }
}
