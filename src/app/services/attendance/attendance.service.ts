import {inject, Injectable} from '@angular/core';
import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {DateRange} from "../../interfaces/DateRange";
import {collection, collectionCount, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {LineChartDTO} from "../../interfaces/LineChartDTO";
import {UtilService} from "../util/util.service";
import {firstValueFrom} from "rxjs";
import {Attendance} from "../../interfaces/dto/Attendance";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {

  private readonly firestore = inject(Firestore);
  private readonly utilService = inject(UtilService);

  public countTotalByAttendanceByStatus(attendanceStatus: AttendanceStatus[], date: Date) {
    const [startDate, endDate] = this.utilService.dateToDateRange(date);

    // Get the total number of on time students in attendances collection
    const attendanceCollection = query(collection(this.firestore, "attendances"),
      where("status", "in", attendanceStatus),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );

    return collectionCount(attendanceCollection);
  }

  /**
   * This function is used to get all attendances by their status and date range.
   * This function is demanding in reads of Firebase, it is best to use sparingly.
   *
   * @note This function is demanding in reads of Firebase, it is best to use sparingly.
   *       Firebase has a limit of 50,000 document reads per day, if you have a large number of
   *       students and you call this function too frequently, you might quickly reach this limit.
   *       If you need to frequently call this function, consider implementing caching or
   *       other optimizations.
   *
   * @param attendanceStatus - The status of the attendance that you want to get.
   * @param dateRange - The date range that you want to get.
   * @returns A promise that resolves to an array of attendance objects.
   * @throws When there is an error with the Firebase Firestore.
   */
  public getAllAttendanceByStatusAndDateRange(attendanceStatus: AttendanceStatus[], dateRange: DateRange) {
    // Checks
    if (dateRange == null) {
      throw new Error("Date Range cannot be null");
    }

    const [startDate, endDate] = this.utilService.dateRangeToDateRange(dateRange);
    // If not in production mode, verbose
    if (!environment.production) {
      console.log(`Getting all attendance by status ${attendanceStatus} from ${startDate.toDate().toISOString()} to ${endDate.toDate().toISOString()}`);
    }

    // Get the total number of on time students in attendances collection
    const attendanceCollection = query(collection(this.firestore, "attendances"),
      where("status", "in", attendanceStatus),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );

    return collectionData(attendanceCollection, {idField: "id"});
  }

  public async getLineChartByAttendanceStatusAndDate(dateRange: DateRange, attendanceStatus: AttendanceStatus[]) {
    // If not in production mode, verbose
    if (!environment.production) {
      console.log("getLineChartByAttendanceStatusAndDate", dateRange, attendanceStatus);
    }

    const lineChart: LineChartDTO = {
      labels: [],
      data: []
    }

    // Looping through the date range
    const attendances: Attendance[] = await firstValueFrom(this.getAllAttendanceByStatusAndDateRange(attendanceStatus, dateRange));
    const dailyCounts: { [date: string]: number } = {};
    attendances.forEach(attendance => {
      const dateString = attendance.date.toDate().toISOString().split("T")[0];
      if (!dailyCounts[dateString]) {
        dailyCounts[dateString] = 0;
      }

      dailyCounts[dateString]++;
    });

    Object.keys(dailyCounts).forEach((dateString) => {
      lineChart.labels.push(dateString);
      lineChart.data.push(dailyCounts[dateString]);
    });

    return lineChart;
  }

  public async getLineChartOfTotalAttendance(dateRange: DateRange) {
    return this.getLineChartByAttendanceStatusAndDate(dateRange, [AttendanceStatus.ON_TIME, AttendanceStatus.LATE]).then((lineChartDTO: LineChartDTO) => {
      // Checks if line chart is null
      if (lineChartDTO === null) {
        console.error("Line Chart was not retrieved properly, Total Attendance Chart was not loaded.");
        return {
          labels: [],
          data: []
        } as LineChartDTO;
      }

      return lineChartDTO;
    });
  }
}
