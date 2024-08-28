import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {
  ClassOverAllAttendanceComponent
} from "../../../../components/global/classes/cards/class-total-student-card/class-over-all-attendance.component";
import {
  ClassOnTimeStudentCardComponent
} from "../../../../components/global/classes/cards/class-on-time-student-card/class-on-time-student-card.component";
import {
  ClassLateStudentCardComponent
} from "../../../../components/global/classes/cards/class-late-student-card/class-late-student-card.component";
import {
  ClassAbsentStudentCardComponent
} from "../../../../components/global/classes/cards/class-absent-student-card/class-absent-student-card.component";
import {
  ClassMonthlyAttendanceCardComponent
} from "../../../../components/global/classes/cards/class-monthly-attendance-card/class-monthly-attendance-card.component";
import {
  ClassAttendanceDemographicsCardComponent
} from "../../../../components/global/classes/cards/class-attendance-demographics-card/class-attendance-demographics-card.component";
import {
  ClassAbsentStudentsListCardComponent
} from "../../../../components/global/classes/cards/class-absent-students-list-card/class-absent-students-list-card.component";
import {
  ClassStudentsListCardComponent
} from "../../../../components/global/classes/cards/class-students-list-card/class-students-list-card.component";
import {
  ClassTodaysActivitiesCardComponent
} from "../../../../components/global/classes/cards/class-todays-activities-card/class-todays-activities-card.component";
import {
  ClassSectionDetailsCardComponent
} from "../../../../components/global/classes/cards/class-section-selection-card/class-section-details-card.component";
import {Class} from "../../../../interfaces/dto/Class";
import {ClassService} from "../../../../services/class/class.service";
import {AttendanceService} from "../../../../services/attendance/attendance.service";
import {AttendanceStatus} from "../../../../enums/AttendanceStatus";
import {Student} from "../../../../interfaces/dto/Student";
import {UtilService} from "../../../../services/util/util.service";
import {ChartDays} from "../../../../enums/ChartDays";
import {Sex} from "../../../../enums/Sex";
import {StudentService} from "../../../../services/student/student.service";
import {Attendance} from "../../../../interfaces/dto/Attendance";

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CardModule,
    ClassOverAllAttendanceComponent,
    ClassOnTimeStudentCardComponent,
    ClassLateStudentCardComponent,
    ClassAbsentStudentCardComponent,
    ClassMonthlyAttendanceCardComponent,
    ClassAttendanceDemographicsCardComponent,
    ClassAbsentStudentsListCardComponent,
    ClassStudentsListCardComponent,
    ClassTodaysActivitiesCardComponent,
    ClassSectionDetailsCardComponent
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {

  // ! Injections
  private readonly classService = inject(ClassService);
  private readonly utilService = inject(UtilService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly studentService = inject(StudentService);

  // * Classes
  public classes: Class[] = [];
  public _classSelected?: Class;

  // * Students
  public students: Student[] = [];
  protected totalCards = {
    totalStudents: 0,
    overAllAttendance: 0,
    onTime: 0,
    late: 0,
    absent: 0
  };

  // * Attendance
  protected monthlyAttendance = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Late",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "On Time",
        data: [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label: "Absent",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  }
  protected attendanceDemographics = {
    male: 0,
    female: 0
  }
  protected absentStudents: Student[] = [];

  ngOnInit() {
    this.retrieveClasses();
  }

  public async onClassSelected(classSelected: Class) {
    this._classSelected = classSelected;

    // Get the class details
    this.totalCards.late = await this.attendanceService.countAttendancesInClass(classSelected, new Date(), [AttendanceStatus.LATE], [Sex.MALE, Sex.FEMALE]);
    this.totalCards.absent = await this.attendanceService.countAttendancesInClass(classSelected, new Date(), [AttendanceStatus.ABSENT], [Sex.MALE, Sex.FEMALE]);
    this.totalCards.onTime = await this.attendanceService.countAttendancesInClass(classSelected, new Date(), [AttendanceStatus.ON_TIME], [Sex.MALE, Sex.FEMALE]);
    this.updateAbsentStudents(classSelected);
    this.updateStudents(classSelected);
    this.updateMonthlyAttendance(classSelected);
    this.updateAttendanceDemographics(classSelected);
  }

  private updateAbsentStudents(classroom: Class) {
    const absentStudentsObservable = this.attendanceService.getAllAttendanceByStatusAndDateRange([AttendanceStatus.ABSENT], new Date(), classroom);
    absentStudentsObservable.subscribe((attendances: Attendance[]) => {
      this.absentStudents = attendances.filter(attendance => attendance.status === AttendanceStatus.ABSENT).map(attendance => attendance.studentObj);
    });
  }

  private updateMonthlyAttendance(classroom: Class) {
    // ! Get Monthly Attendance and Attendance demographics, load them asynchronously
    const lateChart = this.attendanceService.getLineChart(this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS), [AttendanceStatus.LATE], classroom);
    const onTimeChart = this.attendanceService.getLineChart(this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS), [AttendanceStatus.ON_TIME], classroom);
    const absentChart = this.attendanceService.getLineChart(this.utilService.chartDaysToDateRange(ChartDays.LAST_30_DAYS), [AttendanceStatus.ABSENT], classroom);
    const chart = Promise.all([lateChart, onTimeChart, absentChart]);
    chart.then((value) => {
      const late = value[0];
      const onTime = value[1];
      const absent = value[2];
      this.monthlyAttendance = {
        ...this.monthlyAttendance,
        labels: late.labels,
        datasets: [
          {
            label: "Late",
            data: late.data
          },
          {
            label: "On Time",
            data: onTime.data
          },
          {
            label: "Absent",
            data: absent.data
          }
        ]
      }
    });
  }

  private updateStudents(classroom: Class) {
    const studentsObservable = this.studentService.getClassStudents(classroom);
    studentsObservable.subscribe((students: Student[]) => {
      this.students = students;
    });
  }

  private updateAttendanceDemographics(classroom: Class) {
    const maleAttendance = this.attendanceService.countAttendancesInClass(classroom, new Date(), [AttendanceStatus.ON_TIME, AttendanceStatus.LATE], [Sex.MALE]);
    const femaleAttendance = this.attendanceService.countAttendancesInClass(classroom, new Date(), [AttendanceStatus.ON_TIME, AttendanceStatus.LATE], [Sex.FEMALE]);
    const attendanceDemographics = Promise.all([maleAttendance, femaleAttendance]);
    attendanceDemographics.then((values) => {
      const male = values[0];
      const female = values[1];
      this.attendanceDemographics = {
        ...this.attendanceDemographics,
        male: male,
        female: female
      }
    });
  }

  public retrieveClasses(): void {
    this.classService.getAllClasses().subscribe((classes: Class[]) => {
      this.classes = classes;
    });
  }
}
