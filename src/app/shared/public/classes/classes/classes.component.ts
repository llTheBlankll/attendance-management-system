import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { forkJoin } from 'rxjs';
import { ClassAbsentStudentCardComponent } from '../../../../components/shared/classes/cards/class-absent-student-card/class-absent-student-card.component';
import { ClassAbsentStudentsListCardComponent } from '../../../../components/shared/classes/cards/class-absent-students-list-card/class-absent-students-list-card.component';
import { ClassAttendanceDemographicsCardComponent } from '../../../../components/shared/classes/cards/class-attendance-demographics-card/class-attendance-demographics-card.component';
import { ClassLateStudentCardComponent } from '../../../../components/shared/classes/cards/class-late-student-card/class-late-student-card.component';
import { ClassMonthlyAttendanceCardComponent } from '../../../../components/shared/classes/cards/class-monthly-attendance-card/class-monthly-attendance-card.component';
import { ClassOnTimeStudentCardComponent } from '../../../../components/shared/classes/cards/class-on-time-student-card/class-on-time-student-card.component';
import { ClassSectionDetailsCardComponent } from '../../../../components/shared/classes/cards/class-section-selection-card/class-section-details-card.component';
import { ClassStudentsListCardComponent } from '../../../../components/shared/classes/cards/class-students-list-card/class-students-list-card.component';
import { ClassTodaysActivitiesCardComponent } from '../../../../components/shared/classes/cards/class-todays-activities-card/class-todays-activities-card.component';
import { ClassOverAllAttendanceComponent } from '../../../../components/shared/classes/cards/class-total-student-card/class-over-all-attendance.component';
import { AttendanceForeignEntity } from '../../../../core/enums/AttendanceForeignEntity';
import { AttendanceStatus } from '../../../../core/enums/AttendanceStatus';
import { TimeRange } from '../../../../core/enums/TimeRange';
import { TimeStack } from '../../../../core/enums/TimeStack';
import { ClassroomDemographicsChart } from '../../../../core/interfaces/ClassroomDemographicsChart';
import { DateRange } from '../../../../core/interfaces/DateRange';
import { Attendance } from '../../../../core/interfaces/dto/attendance/Attendance';
import { ClassroomDTO } from '../../../../core/interfaces/dto/classroom/ClassroomDTO';
import { Student } from '../../../../core/interfaces/dto/student/Student';
import { AttendanceService } from '../../../../core/services/attendance/attendance.service';
import { ClassroomService } from '../../../../core/services/classroom/classroom.service';
import { StudentService } from '../../../../core/services/student/student.service';
import { UtilService } from '../../../../core/services/util/util.service';

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
  public classrooms: ClassroomDTO[] = [];
  public _classroomSelected?: ClassroomDTO;

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
  private dateRange = this.utilService.timeRangeToDateRange(
    TimeRange.LAST_365_DAYS
  );

  protected absentStudents: Student[] = [];

  ngOnInit() {
    this.retrieveClasses();
  }

  public onClassroomSelected(classSelected: ClassroomDTO) {
    if (classSelected.id === undefined) {
      return;
    }
    console.debug(`New Classroom Selected: ${classSelected.classroomName}`);
    this._classroomSelected = classSelected;
    this.students = classSelected.students;

    // * Update the components
    this.updateMonthlyAttendance(classSelected.id);
    this.updateAttendanceDemographics(classSelected.id);

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
    const totalStudents = this.studentService.getTotalStudents(
      classSelected.id
    );
    const classDetails = forkJoin([late, absent, onTime, totalStudents]);
    classDetails.subscribe((values) => {
      this.totalCards = {
        ...this.totalCards,
        late: values[0],
        absent: values[1],
        onTime: values[2],
        totalStudents: values[3],
      };
      if (classSelected.id !== undefined) {
        this.updateOverAllAttendance(classSelected.id);
      }
    });
    this.attendanceService
      .getForeignEntityAttendances(
        [
          AttendanceStatus.ON_TIME,
          AttendanceStatus.LATE,
          AttendanceStatus.ABSENT,
        ],
        new DateRange(),
        AttendanceForeignEntity.CLASSROOM,
        classSelected.id
      )
      .subscribe((attendances: Attendance[]) => {
        this.absentStudents = attendances
          .filter((attendance) => attendance.status === AttendanceStatus.ABSENT)
          .map((attendance) => attendance.student);
      });
  }

  private updateOverAllAttendance(classroomId: number) {
    // * Over all attendance
    const dateRange = this.utilService.timeRangeToDateRange(
      TimeRange.LAST_30_DAYS
    );
    this.attendanceService
      .countForeignEntityAttendance(
        [AttendanceStatus.ON_TIME, AttendanceStatus.LATE],
        dateRange,
        AttendanceForeignEntity.CLASSROOM,
        classroomId
      )
      .subscribe((totalAttendance: number) => {
        const daysCount = this.utilService.getDaysCount(dateRange);
        // Get overall attendance by percentage using daysCount, totalAttendance, and totalStudents
        const monthOverAllAttendance =
          ((totalAttendance / daysCount) * 100) / this.totalCards.totalStudents;
        if (isNaN(monthOverAllAttendance)) {
          this.totalCards.overAllAttendance = 0;
        } else {
          this.totalCards.overAllAttendance = Number(
            monthOverAllAttendance.toFixed(2)
          );
        }
      });
  }

  private updateMonthlyAttendance(classroomId: number) {
    console.debug(
      'Get Monthly Attendance and Attendance demographics with Date Range: ',
      this.dateRange
    );
    // ! Get Monthly Attendance and Attendance demographics, load them asynchronously
    const lateChart = this.attendanceService.getLineChart(
      this.dateRange,
      [AttendanceStatus.LATE],
      TimeStack.MONTH,
      AttendanceForeignEntity.CLASSROOM,
      classroomId
    );
    const onTimeChart = this.attendanceService.getLineChart(
      this.dateRange,
      [AttendanceStatus.ON_TIME],
      TimeStack.MONTH,
      AttendanceForeignEntity.CLASSROOM,
      classroomId
    );
    const absentChart = this.attendanceService.getLineChart(
      this.dateRange,
      [AttendanceStatus.ABSENT],
      TimeStack.MONTH,
      AttendanceForeignEntity.CLASSROOM,
      classroomId
    );
    const chart = forkJoin([lateChart, onTimeChart, absentChart]);
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

  private updateAttendanceDemographics(classroomId: number) {
    this.attendanceService
      .getClassroomAttendanceDemographics(
        new DateRange(),
        [AttendanceStatus.ON_TIME, AttendanceStatus.LATE],
        classroomId
      )
      .subscribe((demographics) => {
        this.attendanceDemographics = demographics;
      });
  }

  public retrieveClasses(): void {
    this.classroomService
      .getAllClassrooms()
      .subscribe((classes: ClassroomDTO[]) => {
        this.classrooms = classes;
      });
  }
}