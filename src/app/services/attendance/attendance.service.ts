import {inject, Injectable} from '@angular/core';
import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {DateRange} from "../../interfaces/DateRange";
import {collection, collectionCount, Firestore, query, where} from "@angular/fire/firestore";
import {LineChartDTO} from "../../interfaces/LineChartDTO";
import {CollectionReference} from "@angular/fire/compat/firestore";
import {environment} from "../../../environments/environment";
import {Timestamp} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private readonly firestore = inject(Firestore);

  public getTotalAttendanceByStatus(attendanceStatus: AttendanceStatus, date: Date) {
    // Get the total number of on time students in attendances collection
    const attendanceCollection = query(collection(this.firestore, "attendances"),
      where("status", "==", attendanceStatus),
      where("date", "==", Timestamp.fromDate(date))
    );
    console.log(
      Timestamp.fromDate(date),
      date
    )
    return collectionCount(
      attendanceCollection
    )
  }

  public getLineChartByAttendanceStatusAndDate(date: DateRange, attendanceStatus: AttendanceStatus) {
    const lineChart: LineChartDTO = {
      labels: [],
      data: []
    };

    const attendanceCollection = query(
      collection(
        this.firestore, "attendances"
      ),
      where("status", "==", attendanceStatus),
      where("date", ">=", date.startDate.toISOString().split('T')[0]),
      where("date", "<=", date.endDate.toISOString().split('T')[0])
    );

    // Loop date range start date until date range end date
    let currentDate = date.startDate;
    while (currentDate <= date.endDate) {
      // Push the data to the line chart
      lineChart.labels.push(
        Timestamp.fromDate(currentDate).toDate().toISOString().split('T')[0]
      );
      // Save the data
      collectionCount(
        attendanceCollection
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
      const attendanceCollection = query(
        collection(this.firestore, "attendances"),
        where("date", "==", Timestamp.fromDate(currentDate)),
        where("status", "==", AttendanceStatus.ON_TIME),
        where("status", "==", AttendanceStatus.LATE)
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
      console.log(`Line Chart for Total Attendance:`);
      console.log(lineChart);
    }

    return lineChart;
  }
}
