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
import {Classroom} from "../../../../interfaces/dto/classroom/Classroom";
import {AttendanceService} from "../../../../services/attendance/attendance.service";
import {AttendanceStatus} from "../../../../enums/AttendanceStatus";
import {UtilService} from "../../../../services/util/util.service";
import {TimeRange} from "../../../../enums/TimeRange";
import {Sex} from "../../../../enums/Sex";
import {StudentService} from "../../../../services/student/student.service";
import {firstValueFrom} from "rxjs";
import {Student} from "../../../../interfaces/dto/student/Student";
import {Attendance} from "../../../../interfaces/dto/attendance/Attendance";
import {ClassroomService} from "../../../../services/classroom/classroom.service";
import {DateRange} from "../../../../interfaces/DateRange";
import {AttendanceForeignEntity} from "../../../../enums/AttendanceForeignEntity";
import {TimeStack} from "../../../../enums/TimeStack";

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
  private readonly classroomService = inject(ClassroomService);
  private readonly utilService = inject(UtilService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly studentService = inject(StudentService);

  // * Classes
  public classrooms: Classroom[] = [];
  public _classroomSelected?: Classroom;

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
  protected classAttendanceToday: Attendance[] = [];
  protected absentStudents: Student[] = [];

  ngOnInit() {
    this.retrieveClasses();
  }

  public async onClassSelected(classSelected: Classroom) {
    this._classroomSelected = classSelected;
    if (classSelected.id || classSelected.id) {
      return;
    }

    // * Update the components
    this.updateAbsentStudents(classSelected);
    this.updateStudents(classSelected);
    this.updateMonthlyAttendance(classSelected);
    this.updateAttendanceDemographics(classSelected);

    // * Get the class details
    const late = firstValueFrom<number>(this.attendanceService.countAttendancesInClassroom([AttendanceStatus.LATE], new DateRange(), classSelected.id));
    const absent = firstValueFrom<number>(this.attendanceService.countAttendancesInClassroom([AttendanceStatus.ABSENT], new DateRange(), classSelected.id));
    const onTime = firstValueFrom<number>(this.attendanceService.countAttendancesInClassroom([AttendanceStatus.ON_TIME], new DateRange(), classSelected.id));
    const totalStudents = firstValueFrom<number>(this.studentService.getTotalStudents(classSelected.id));
    const classDetails = Promise.all([late, absent, onTime, totalStudents]);
    classDetails.then((values) => {
      console.log(values)
      this.totalCards = {
        ...this.totalCards,
        late: values[0],
        absent: values[1],
        onTime: values[2],
        totalStudents: values[3]
      }
    });

    this.updateOverAllAttendance(classSelected);
  }

  private updateOverAllAttendance(classroom: Classroom) {
    // * Over all attendance
    const dateRange = this.utilService.timeRangeToDateRange(TimeRange.LAST_30_DAYS);
    this.attendanceService.countTotalAttendanceByStatus(
      [AttendanceStatus.ON_TIME, AttendanceStatus.LATE],
      dateRange,
      AttendanceForeignEntity.CLASSROOM,
      classroom.id
    ).subscribe((totalAttendance: number) => {
      const daysCount = this.utilService.getDaysCount(dateRange);
      // Get overall attendance by percentage using daysCount, totalAttendance, and totalStudents
      this.totalCards.overAllAttendance = Number(Number((totalAttendance / (daysCount * this.totalCards.totalStudents) * 100) / 100).toFixed(2));
    });
  }

  private updateAbsentStudents(classroom: Classroom) {
    const absentStudentsObservable = this.attendanceService.getAllAttendanceByStatusAndDateRange([AttendanceStatus.ABSENT], new Date(), classroom);
    absentStudentsObservable.subscribe((attendances: Attendance[]) => {

    });
  }

  private updateMonthlyAttendance(classroom: Classroom) {
    // ! Get Monthly Attendance and Attendance demographics, load them asynchronously
    const lateChart = firstValueFrom(this.attendanceService.getLineChart(this.utilService.timeRangeToDateRange(TimeRange.LAST_30_DAYS), [AttendanceStatus.LATE], TimeStack.MONTH, AttendanceForeignEntity.CLASSROOM, classroom.id));
    const onTimeChart = firstValueFrom(this.attendanceService.getLineChart(this.utilService.timeRangeToDateRange(TimeRange.LAST_30_DAYS), [AttendanceStatus.ON_TIME], TimeStack.MONTH, AttendanceForeignEntity.CLASSROOM, classroom.id));
    const absentChart = firstValueFrom(this.attendanceService.getLineChart(this.utilService.timeRangeToDateRange(TimeRange.LAST_30_DAYS), [AttendanceStatus.ABSENT], TimeStack.MONTH, AttendanceForeignEntity.CLASSROOM, classroom.id));
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

  private updateStudents(classroom: Classroom) {
    const studentsObservable = this.classroomService.getClassroom(classroom.id);
    studentsObservable.subscribe((classroom: Classroom) => {
      this.students = classroom.students;
    });
  }

  private updateAttendanceDemographics(classroom: Classroom) {
    const attendanceDemographics = this.attendanceService.getClassroomAttendanceDemographics(new DateRange(), [AttendanceStatus.ON_TIME, AttendanceStatus.LATE], classroom.id);
    attendanceDemographics.subscribe()
  }

  public retrieveClasses(): void {
    this.classroomService.getAllClassrooms().subscribe((classes: Classroom[]) => {
      this.classrooms = classes;
    });
  }
}
