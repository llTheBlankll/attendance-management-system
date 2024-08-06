import { Injectable } from '@angular/core';
import {ChartDays} from "../../enums/ChartDays";
import {DateRange} from "../../interfaces/DateRange";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public formatDateToLocalDate(date: Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
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
        last7Days.setDate(currentDate.getDate() - 6);
        return new DateRange(last7Days, currentDate);
      case ChartDays.LAST_30_DAYS:
        // Subtract 30 days from the current date
        const last30Days = new Date(currentDate);
        last30Days.setDate(currentDate.getDate() - 29);
        return new DateRange(last30Days, currentDate);
      case ChartDays.LAST_90_DAYS:
        // Subtract 90 days from the current date
        const last90Days = new Date(currentDate);
        last90Days.setDate(currentDate.getDate() - 89);
        return new DateRange(last90Days, currentDate);
      case ChartDays.LAST_365_DAYS:
        // Subtract 365 days from the current date
        const last365Days = new Date(currentDate);
        last365Days.setDate(currentDate.getDate() - 364);
        return new DateRange(last365Days, currentDate);
      default:
        return new DateRange(currentDate, currentDate);
    }
  }
}
