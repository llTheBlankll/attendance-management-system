import {inject, Injectable} from '@angular/core';
import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {DateRange} from "../../interfaces/DateRange";
import {collection, collectionCount, collectionData, doc, Firestore, query, where} from "@angular/fire/firestore";
import {LineChartDTO} from "../../interfaces/LineChartDTO";
import {UtilService} from "../util/util.service";
import {firstValueFrom, Observable} from "rxjs";
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

  /**
   * Get the total number of attendances by the given status and date range.
   *
   * @param attendanceStatus - The statuses of attendance that you want to count.
   * @param date - The date or date range of the data to be counted.
   *               If a DateRange is given, the function will count the attendance for all days in the range.
   * @param classroom - The classroom that you want to count the attendance for. If undefined, all classrooms will be counted.
   * @param student - The student that you want to count the attendance for. If undefined, all students will be counted.
   * @returns An observable that resolves to the total number of attendances.
   */
  public countTotalByAttendanceByStatus(attendanceStatus: AttendanceStatus[], date: Date | DateRange, classroom?: Class, student?: Student): Observable<number> {
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);

    // Get the total number of on time students in attendances collection
    const attendanceCollection = query(collection(this.firestore, "attendances"),
      where("status", "in", attendanceStatus),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      ...(classroom ? [where("studentObj.classroom", "==", this.classService.getClassroom(classroom.id))] : []),
      ...(student ? [where("student", "==", this.studentService.getStudent(student))] : [])
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
      ...(classroom === undefined ? [] : [where("studentObj.classroom", "==", this.classService.getClassroom(classroom.id))]),
      ...(student === undefined ? [] : [where("student", "==", this.studentService.getStudent(student))])
    );

    return collectionData(attendanceCollection, {idField: "id"});
  }

  /**
   * This function is used to generate a line chart of attendance by the given time stack.
   * It is used to generate a line chart of attendance by the given time stack.
   *
   * @param dateRange - The date range of the data to be graphed.
   * @param attendanceStatus - The statuses of attendance that you want to graph.
   * @param classroom - The classroom that you want to graph. If undefined, all classrooms will be graphed.
   * @param student - The student that you want to graph. If undefined, all students will be graphed.
   * @param timeStack - The time stack that you want to graph. The default is "week".
   *                    The available time stacks are
   *                    - "week" - The graph will be divided into weeks.
   *                    - "month" - The graph will be divided into months.
   *                    - Any other string - The graph will be divided into days.
   * @returns A promise that resolves to a LineChartDTO object.
   * @throws When there is an error with the Firebase Firestore.
   */
  public async getLineChart(dateRange: DateRange, attendanceStatus: AttendanceStatus[], classroom: Class | undefined = undefined, student: Student | undefined = undefined, timeStack = "week") {
    console.log(timeStack);
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
      const currentDate = new Date(date);
      switch (timeStack) {
        case "week":
          dateString = "Week " + this.utilService.getCurrentWeekOfMonth(date).toString() + " of " + this.utilService.getMonthName(date.getMonth() + 1) + "/" + date.getFullYear().toString();
          date.setDate(date.getDate() + 7);
          break;
        case "month":
          dateString = `${this.utilService.getMonthName(date.getMonth() + 1)}, ${date.getFullYear().toString()}`;
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

      const attendances = await firstValueFrom(this.countTotalByAttendanceByStatus(attendanceStatus, new DateRange(currentDate, date), classroom, student));
      dailyCounts[dateString] += attendances;
    }

    console.log(dailyCounts);

    for (const [key, value] of Object.entries(dailyCounts)) {
      lineChart.labels.push(key);
      lineChart.data.push(value);
    }

    return lineChart;
  }

  /**
   * Retrieves the line chart data of total attendance for the given date range, grouped by the given time stack.
   * @param dateRange The date range for which to retrieve the total attendance line chart.
   * @param timeStack The time stack to group the total attendance by. Possible values are "day", "week", and "month".
   * @returns A promise that resolves to a LineChartDTO containing the labels and data for the total attendance line chart.
   * If the line chart was not retrieved properly, a LineChartDTO with empty labels and data will be returned.
   */
  public async getLineChartOfTotalAttendance(dateRange: DateRange, timeStack: string) {
    return this.getLineChart(dateRange, [AttendanceStatus.ON_TIME, AttendanceStatus.LATE], undefined, undefined, timeStack).then((lineChartDTO: LineChartDTO) => {
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

  /**
   * Retrieves the total number of attendances for the given date, attendance status, and sex.
   * @param date The date for which to retrieve the total attendance count.
   * @param attendanceStatus The statuses of attendance that you want to count.
   * @param sex The sex of the students that you want to count the attendance for. If undefined, all sexes will be counted.
   * @returns A promise that resolves to the total number of attendances for the given date, attendance status, and sex.
   */
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


  /**
   * Retrieves the total number of attendances for the given class, date, attendance status, and sex.
   * @param classroom The class for which to retrieve the total attendance count.
   * @param date The date for which to retrieve the total attendance count.
   * @param attendanceStatus The statuses of attendance that you want to count.
   * @param sex The sex of the students that you want to count the attendance for. If undefined, all sexes will be counted.
   * @returns A promise that resolves to the total number of attendances for the given class, date, attendance status, and sex.
   */
  public countAttendancesInClass(classroom: Class, date: Date, attendanceStatus: AttendanceStatus[], sex: Sex[] = [Sex.MALE, Sex.FEMALE]): Observable<number> {
    const [startDate, endDate] = this.utilService.dateToTimestamp(date);

    const classRef = this.classService.getClassroom(classroom.id);
    const attendanceCollection = query(
      collection(this.firestore, "attendances"),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      where("status", "in", attendanceStatus),
      where("studentObj.sex", "in", sex),
      where("studentObj.classroom", "==", classRef)
    );

    return collectionCount(attendanceCollection);
  }

  /**
   * Retrieves all attendances for the given student, date, and attendance status.
   * @param student The student for which to retrieve the attendances.
   * @param date The date or date range for which to retrieve the attendances.
   *             If a DateRange is given, the function will retrieve all attendances for all days in the range.
   * @param attendanceStatus The statuses of attendance that you want to retrieve. If undefined, all statuses will be retrieved.
   * @returns A promise that resolves to an array of attendance objects.
   * @throws When there is an error with the Firebase Firestore.
   */
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

  /**
   * Retrieves the total number of attendances for the given student, date, and attendance status.
   * @param student The student for which to retrieve the total number of attendances.
   * @param date The date or date range for which to retrieve the total number of attendances.
   *             If a DateRange is given, the function will retrieve the total number of attendances for all days in the range.
   * @param attendanceStatus The statuses of attendance that you want to retrieve. If undefined, all statuses will be retrieved.
   * @returns A promise that resolves to the total number of attendances for the given student, date, and attendance status.
   * @throws When there is an error with the Firebase Firestore.
   */
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
