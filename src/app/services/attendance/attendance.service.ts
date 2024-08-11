import {inject, Injectable} from '@angular/core';
import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {DateRange} from "../../interfaces/DateRange";
import {and, collection, collectionCount, Firestore, getDocs, query, Timestamp, where} from "@angular/fire/firestore";
import {LineChartDTO} from "../../interfaces/LineChartDTO";
import {environment} from "../../../environments/environment";
import {UtilService} from "../util/util.service";
import {DocumentData, QueryDocumentSnapshot} from "@angular/fire/compat/firestore";
import {Attendance} from "../../interfaces/dto/Attendance";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private readonly firestore = inject(Firestore);
  private readonly utilService = inject(UtilService);

  public getTotalAttendanceByStatus(attendanceStatus: AttendanceStatus, date: Date) {
    const [startDate, endDate] = this.utilService.dateToDateRange(date);

    // Get the total number of on time students in attendances collection
    const attendanceCollection = query(collection(this.firestore, "attendances"),
      where("status", "==", attendanceStatus),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );

    return collectionCount(attendanceCollection);
  }

  public async getLineChartByAttendanceStatusAndDate(dateRange: DateRange, attendanceStatus: AttendanceStatus) {
    const lineChart: LineChartDTO = {
      labels: [],
      data: []
    };

    // Loop date range start date until date range end date
    // Set the dateRange.startDate to 00:00:00
    const currentDate = new Date(dateRange.startDate);
    currentDate.setHours(0, 0, 0, 0);

    // Get the total number of on time students in attendances collection
    // Loop date range until date range end date
    while (currentDate <= dateRange.endDate) {
      const [dateRangeStart, dateRangeEnd] = this.utilService.dateToDateRange(currentDate);

      // Set the label and data of the line chart
      lineChart.labels.push(currentDate.toISOString().split('T')[0]);
      console.log("\nStart Date: " + dateRangeStart.toDate() + "\nEnd Date: " + dateRangeEnd.toDate());

      // Get the total number of on time students in attendances collection
      const attendanceCollection = query(
        collection(this.firestore, "attendances"),
        where("status", "==", attendanceStatus),
        where("date", ">=", dateRangeStart),
        where("date", "<=", dateRangeEnd)
      );

      // Save the data
      collectionCount(attendanceCollection).subscribe((total: number) => {
        lineChart.data.push(total);
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // If not in production, show line chart data.
    if (!environment.production) {
      console.log(lineChart);
    }

    return lineChart;
  }

  public getLineChartOfTotalAttendance(dateRange: DateRange) {
    const lineChart: LineChartDTO = {
      labels: [],
      data: []
    };

    // Loop date range start date until date range end date
    let currentDate = dateRange.startDate;
    while (currentDate <= dateRange.endDate) {
      const [startDate, endDate] = this.utilService.dateToDateRange(currentDate);

      // Get the total number of on time students in attendances collection
      const attendanceCollection = query(
        collection(this.firestore, "attendances"),
        where("date", ">=", startDate),
        where("date", "<=", endDate),
        where("status", "in", Array.of(AttendanceStatus.ON_TIME, AttendanceStatus.LATE)),
      );

      // Push the data to the line chart
      lineChart.labels.push(currentDate.toISOString().split('T')[0]);
      // Save the data
      collectionCount(attendanceCollection).subscribe((total: number) => {
        lineChart.data.push(total);
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // If not in production, show line chart data.
    if (!environment.production) {
      console.log(`Line Chart for Total Attendance: `);
      console.log(lineChart);
    }

    return lineChart;
  }
}
