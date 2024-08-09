import {inject, Injectable} from '@angular/core';
import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {DateRange} from "../../interfaces/DateRange";
import {collection, collectionCount, Firestore, query, where} from "@angular/fire/firestore";
import {LineChartDTO} from "../../interfaces/LineChartDTO";
import {CollectionReference} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private readonly firestore = inject(Firestore);

  public getTotalAttendanceByStatus(attendanceStatus: AttendanceStatus, date: Date) {
    // Get the total number of on time students in attendances collection
    const attendanceCollection = collection(this.firestore, "attendances");
    return collectionCount(
      attendanceCollection,
      (ref: CollectionReference) => ref
        .where("status", "==", attendanceStatus)
        .where("date", "==", date.toISOString().split('T')[0])
    )
  }

  public getLineChartByAttendanceStatusAndDate(date: DateRange, attendanceStatus: AttendanceStatus) {
    const lineChart: LineChartDTO = {
      labels: [],
      data: []
    };

    const attendanceCollection = collection(this.firestore, "attendances");

    // Loop date range start date until date range end date
    let currentDate = date.startDate;
    while (currentDate <= date.endDate) {
      // Push the data to the line chart
      lineChart.labels.push(currentDate.toISOString().split('T')[0]);
      // Save the data
      collectionCount(
        attendanceCollection,
        (ref: CollectionReference) => {
          return ref
            .where("status", "==", attendanceStatus)
            .where("date", "==", currentDate.toISOString().split('T')[0])
        }
      ).subscribe((total: number) => {
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
      // Get the total number of on time students in attendances collection
      const attendanceCollection = collection(this.firestore, "attendances");

      // Push the data to the line chart
      lineChart.labels.push(currentDate.toISOString().split('T')[0]);
      // Save the data
      collectionCount(
        attendanceCollection,
        (ref: CollectionReference) => {
          return ref
            .where("status", "==", AttendanceStatus.ON_TIME)
            .where("status", "==", AttendanceStatus.LATE)
            .where("date", "==", currentDate.toISOString().split('T')[0])
        }
      ).subscribe((total: number) => {
        lineChart.data.push(total);
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // If not in production, show line chart data.
    if (!environment.production) {
      console.log(`Line Chart for Total Attendance:`);
      console.log(lineChart);
    }

    return lineChart;
  }
}
