import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {
  ClassOverAllAttendanceComponent
} from '../../../../components/global/classes/cards/class-total-student-card/class-over-all-attendance.component';
import {
  ClassOnTimeStudentCardComponent
} from '../../../../components/global/classes/cards/class-on-time-student-card/class-on-time-student-card.component';
import {
  ClassLateStudentCardComponent
} from '../../../../components/global/classes/cards/class-late-student-card/class-late-student-card.component';
import {
  ClassAbsentStudentCardComponent
} from '../../../../components/global/classes/cards/class-absent-student-card/class-absent-student-card.component';
import {
  ClassMonthlyAttendanceCardComponent
} from '../../../../components/global/classes/cards/class-monthly-attendance-card/class-monthly-attendance-card.component';
import {
  ClassAttendanceDemographicsCardComponent
} from '../../../../components/global/classes/cards/class-attendance-demographics-card/class-attendance-demographics-card.component';
import {
  ClassAbsentStudentsListCardComponent
} from '../../../../components/global/classes/cards/class-absent-students-list-card/class-absent-students-list-card.component';
import {
  ClassStudentsListCardComponent
} from '../../../../components/global/classes/cards/class-students-list-card/class-students-list-card.component';
import {
  ClassTodaysActivitiesCardComponent
} from '../../../../components/global/classes/cards/class-todays-activities-card/class-todays-activities-card.component';
import {
  ClassSectionDetailsCardComponent
} from '../../../../components/global/classes/cards/class-section-selection-card/class-section-details-card.component';
import {Classroom} from '../../../../interfaces/dto/classroom/Classroom';
import {AttendanceService} from '../../../../services/attendance/attendance.service';
import {AttendanceStatus} from '../../../../enums/AttendanceStatus';
import {UtilService} from '../../../../services/util/util.service';
import {TimeRange} from '../../../../enums/TimeRange';
import {StudentService} from '../../../../services/student/student.service';
import {forkJoin} from 'rxjs';
import {Student} from '../../../../interfaces/dto/student/Student';
import {Attendance} from '../../../../interfaces/dto/attendance/Attendance';
import {ClassroomService} from '../../../../services/classroom/classroom.service';
import {DateRange} from '../../../../interfaces/DateRange';
import {AttendanceForeignEntity} from '../../../../enums/AttendanceForeignEntity';
import {TimeStack} from '../../../../enums/TimeStack';
import {ClassroomDemographicsChart} from "../../../../interfaces/ClassroomDemographicsChart";

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
    ClassSectionDetailsCardComponent,
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
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
    absent: 0,
  };

  // * Attendance
  protected monthlyAttendance = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Late',
        data: [] as number[],
      },
      {
        label: 'On Time',
        data: [] as number[],
      },
      {
        label: 'Absent',
        data: [] as number[],
      },
    ],
  };
  protected attendanceDemographics: ClassroomDemographicsChart = {
    male: 0,
    female: 0,
  };
  // * Charts
  private dateRange = this.utilService.timeRangeToDateRange(TimeRange.LAST_365_DAYS);

  protected absentStudents: Student[] = [];

  ngOnInit() {
    this.retrieveClasses();
  }

  public onClassroomSelected(classSelected: Classroom) {
    console.debug(`New Classroom Selected: ${classSelected.classroomName}`)
    this._classroomSelected = classSelected;
    this.students = classSelected.students;

    // * Update the components
    this.updateMonthlyAttendance(classSelected);
    this.updateAttendanceDemographics(classSelected);

    // * Get the class details
    const late = this.attendanceService.countForeignEntityAttendance(
      [AttendanceStatus.LATE],
      new DateRange(),
      AttendanceForeignEntity.CLASSROOM,
      classSelected.id
    );
    const absent = this.attendanceService.countForeignEntityAttendance(
      [AttendanceStatus.ABSENT],
      new DateRange(),
      AttendanceForeignEntity.CLASSROOM,
      classSelected.id
    );
    const onTime = this.attendanceService.countForeignEntityAttendance(
      [AttendanceStatus.ON_TIME],
      new DateRange(),
      AttendanceForeignEntity.CLASSROOM,
      classSelected.id
    );
    const totalStudents = this.studentService.getTotalStudents(classSelected.id);
    const classDetails = forkJoin([late, absent, onTime, totalStudents]);
    classDetails.subscribe((values) => {
      this.totalCards = {
        overAllAttendance: 0,
        late: values[0],
        absent: values[1],
        onTime: values[2],
        totalStudents: values[3],
      };
    });
    this.attendanceService.getForeignEntityAttendances(
      [AttendanceStatus.ON_TIME, AttendanceStatus.LATE, AttendanceStatus.ABSENT],
      new DateRange(),
      AttendanceForeignEntity.CLASSROOM,
      classSelected.id
    ).subscribe((attendances: Attendance[]) => {
      this.absentStudents = attendances.filter((attendance) => attendance.status === AttendanceStatus.ABSENT).map((attendance) => attendance.student);
    });

    this.updateOverAllAttendance(classSelected);
  }

  private updateOverAllAttendance(classroom: Classroom) {
    // * Over all attendance
    const dateRange = this.utilService.timeRangeToDateRange(
      TimeRange.LAST_30_DAYS
    );
    this.attendanceService
      .countForeignEntityAttendance(
        [AttendanceStatus.ON_TIME, AttendanceStatus.LATE],
        dateRange,
        AttendanceForeignEntity.CLASSROOM,
        classroom.id
      )
      .subscribe((totalAttendance: number) => {
        const daysCount = this.utilService.getDaysCount(dateRange);
        // Get overall attendance by percentage using daysCount, totalAttendance, and totalStudents
        this.totalCards.overAllAttendance = Number(
          Number(
            (((totalAttendance / (daysCount * this.totalCards.totalStudents)) *
                100) /
              100) * 100
          ).toFixed(2)
        );
      });
  }

  private updateMonthlyAttendance(classroom: Classroom) {
    console.debug("Get Monthly Attendance and Attendance demographics with Date Range: ", this.dateRange);
    // ! Get Monthly Attendance and Attendance demographics, load them asynchronously
    const lateChart =
      this.attendanceService.getLineChart(
        this.dateRange,
        [AttendanceStatus.LATE],
        TimeStack.MONTH,
        AttendanceForeignEntity.CLASSROOM,
        classroom.id
      );
    const onTimeChart =
      this.attendanceService.getLineChart(
        this.dateRange,
        [AttendanceStatus.ON_TIME],
        TimeStack.MONTH,
        AttendanceForeignEntity.CLASSROOM,
        classroom.id
      );
    const absentChart =
      this.attendanceService.getLineChart(
        this.dateRange,
        [AttendanceStatus.ABSENT],
        TimeStack.MONTH,
        AttendanceForeignEntity.CLASSROOM,
        classroom.id
      );
    const chart = forkJoin([lateChart, onTimeChart, absentChart])
    chart.subscribe((lineCharts) => {
      console.debug(lineCharts);
      const late = lineCharts[0];
      const onTime = lineCharts[1];
      const absent = lineCharts[2];
      this.monthlyAttendance = {
        ...this.monthlyAttendance,
        labels: late.labels,
        datasets: [
          {
            label: 'Late',
            data: late.data,
          },
          {
            label: 'On Time',
            data: onTime.data,
          },
          {
            label: 'Absent',
            data: absent.data,
          },
        ],
      };
    });
  }

  private updateAttendanceDemographics(classroom: Classroom) {
    this.attendanceService.getClassroomAttendanceDemographics(
      new DateRange(),
      [AttendanceStatus.ON_TIME, AttendanceStatus.LATE],
      classroom.id
    ).subscribe((demographics) => {
      this.attendanceDemographics = demographics;
    });
  }

  public retrieveClasses(): void {
    this.classroomService
      .getAllClassrooms()
      .subscribe((classes: Classroom[]) => {
        this.classrooms = classes;
      });
  }
}
