import {inject, Injectable} from '@angular/core';
import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {DateRange} from "../../interfaces/DateRange";
import {collection, collectionCount, collectionData, doc, Firestore, query, where} from "@angular/fire/firestore";
import {LineChartDTO} from "../../interfaces/LineChartDTO";
import {UtilService} from "../util/util.service";
import {firstValueFrom} from "rxjs";
import {Attendance} from "../../interfaces/dto/Attendance";
import {Sex} from "../../enums/Sex";
import {Class} from "../../interfaces/dto/Class";
import {ClassService} from "../class/class.service";
import {Student} from "../../interfaces/dto/Student";
import {StudentService} from "../student/student.service";

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {

  private readonly firestore = inject(Firestore);
  private readonly classService = inject(ClassService);
  private readonly studentService = inject(StudentService);
  private readonly utilService = inject(UtilService);

  public countTotalByAttendanceByStatus(attendanceStatus: AttendanceStatus[], date: Date | DateRange, classroom?: Class) {
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);

    // Get the total number of on time students in attendances collection
    const attendanceCollection = query(collection(this.firestore, "attendances"),
      where("status", "in", attendanceStatus),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      ...(classroom ? [where("studentObj.class", "==", this.classService.getClassroom(classroom.id))] : [])
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
   * @param date
   * @param classroom - The classroom that you want to get.
   * @param student - The student that you want to get.
   * @returns A promise that resolves to an array of attendance objects.
   * @throws When there is an error with the Firebase Firestore.
   */
  public getAllAttendanceByStatusAndDateRange(attendanceStatus: AttendanceStatus[], date: DateRange | Date, classroom: Class | undefined = undefined, student: Student | undefined = undefined) {
    // Checks
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);
    let attendanceCollection: any;
    // Get the total number of on time students in attendances collection
    attendanceCollection = query(collection(this.firestore, "attendances"),
      where("status", "in", attendanceStatus),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      ...(classroom === undefined ? [] : [where("studentObj.class", "==", this.classService.getClassroom(classroom.id))]),
      ...(student === undefined ? [] : [where("student", "==", this.studentService.getStudent(student))])
    );

    return collectionData(attendanceCollection, {idField: "id"});
  }

  public async getLineChartTest(dateRange: DateRange, attendanceStatus: AttendanceStatus[], classroom: Class | undefined = undefined, student: Student | undefined = undefined, timeStack = "day") {
    const lineChart: LineChartDTO = {
      labels: [],
      data: []
    }

    const dailyCounts: { [date: string]: number } = {};

    // Looping through the date range
    const date = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    while (date <= endDate) {
      let dateString;
      switch (timeStack) {
        case "week":
          dateString = "Week of " + this.utilService.getCurrentWeekOfMonth(date).toString() + ", " + date.getFullYear().toString();
          date.setDate(date.getDate() + 7);
          break;
        case "month":
          dateString = `Month ${this.utilService.getCurrentMonth(date).toString()} of ${date.getFullYear().toString()}`;
          date.setMonth(date.getMonth() + 1);
          break;
        default:
          dateString = date.toISOString().split("T")[0];
          date.setDate(date.getDate() + 1);
          break;
      }
      if (!dailyCounts[dateString]) {
        dailyCounts[dateString] = 0;
      }
      dailyCounts[dateString]++;
    }

    lineChart.labels = Object.keys(dailyCounts);
    lineChart.data = Object.values(dailyCounts);
    return lineChart;
  }

  public async getLineChart(dateRange: DateRange, attendanceStatus: AttendanceStatus[], classroom: Class | undefined = undefined, student: Student | undefined = undefined, timeStack = "day") {
    // If not in production mode, verbose
    const lineChart: LineChartDTO = {
      labels: [],
      data: []
    }

    // TODO: We can also loop the date range each and don't have to take everything in the firestore attendances document to make it more efficient save read usage.
    return this.getLineChartTest(dateRange, attendanceStatus, classroom, student, timeStack);

    // Looping through the date range
    const attendances: Attendance[] = await firstValueFrom(this.getAllAttendanceByStatusAndDateRange(attendanceStatus, dateRange, classroom));
    const dailyCounts: { [date: string]: number } = {};
    attendances.forEach(attendance => {
      let dateString = attendance.date.toDate().toISOString().split("T")[0];
      switch (timeStack) {
        case "week": {
          dateString = "Week of " + "month" +
            +this.utilService.getCurrentWeekOfMonth(attendance.date.toDate()).toString() + ", " + attendance.date.toDate().getFullYear().toString();
          console.log(dateString);
          if (!dailyCounts[dateString]) {
            dailyCounts[dateString] = 0;
          }
          break;
        }
        case "month": {
          dateString = this.utilService.getCurrentMonth(attendance.date.toDate()).toString();
          if (!dailyCounts[dateString]) {
            dailyCounts[dateString] = 0;
          }
          break;
        }
        default: {
          dateString = attendance.date.toDate().toISOString().split("T")[0];
          if (!dailyCounts[dateString]) {
            dailyCounts[dateString] = 0;
          }
          break;
        }
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
    return this.getLineChart(dateRange, [AttendanceStatus.ON_TIME, AttendanceStatus.LATE]).then((lineChartDTO: LineChartDTO) => {
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

  public async countAttendances(date: Date, attendanceStatus: AttendanceStatus[], sex: Sex[] = [Sex.MALE, Sex.FEMALE]): Promise<number> {
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);

    const attendanceCollection = query(
      collection(this.firestore, "attendances"),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      where("status", "in", attendanceStatus),
      where("studentObj.sex", "in", sex)
    )

    return firstValueFrom(collectionCount(attendanceCollection));
  }

  public countAttendancesInClass(classroom: Class, date: Date, attendanceStatus: AttendanceStatus[], sex: Sex[] = [Sex.MALE, Sex.FEMALE]) {
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);

    const classRef = this.classService.getClassroom(classroom.id);
    const attendanceCollection = query(
      collection(this.firestore, "attendances"),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      where("status", "in", attendanceStatus),
      where("studentObj.sex", "in", sex),
      where("studentObj.class", "==", classRef)
    );

    return collectionCount(attendanceCollection);
  }

  public getAllStudentAttendance(student: Student, date: Date | DateRange, attendanceStatus: AttendanceStatus[] = [AttendanceStatus.ON_TIME, AttendanceStatus.LATE]) {
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);
    const studentRef = doc(this.firestore, "students", student.id.toString());

    const attendanceCollection = query(
      collection(this.firestore, "attendances"),
      where("student", "==", studentRef),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      where("status", "in", attendanceStatus)
    );

    return collectionData(attendanceCollection, {idField: "id"});
  }

  public totalStudentAttendance(student: Student, date: Date | DateRange, attendanceStatus: AttendanceStatus[] = [AttendanceStatus.ON_TIME, AttendanceStatus.LATE]) {
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);
    const studentRef = doc(this.firestore, "students", student.id.toString());

    const attendanceCollection = query(
      collection(this.firestore, "attendances"),
      where("student", "==", studentRef),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      where("status", "in", attendanceStatus)
    );

    return collectionCount(attendanceCollection);
  }
}
