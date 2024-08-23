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
import {LoggingService} from "../../../../services/logging/logging.service";

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

  // Classes
  public classes: Class[] = [];
  public _classSelected?: Class;
  // Students
  public students?: Student[];
  protected totalCards = {
    totalStudents: 0,
    overAllAttendance: 0,
    onTime: 0,
    late: 0,
    absent: 0
  };
  protected attendanceDemographics = {
    male: 0,
    female: 0
  }
  private readonly classService = inject(ClassService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly loggingService = inject(LoggingService);

  ngOnInit() {
    this.retrieveClasses();
  }

  public async onClassSelected(classSelected: Class) {
    this._classSelected = classSelected;

    // Get the class details
    this.totalCards.totalStudents = (classSelected.students !== undefined) ? classSelected.students.length : 0;
    // this.totalCards.overAllAttendance = await this.attendanceService.countClassAttendances(classSelected, new Date());
    console.log(
      JSON.stringify(this.attendanceService.countClassAttendances(classSelected, new Date(), [AttendanceStatus.LATE]))
    );
    this.totalCards.late = await this.attendanceService.countClassAttendances(classSelected, new Date(), [AttendanceStatus.LATE]);
    this.totalCards.absent = await this.attendanceService.countClassAttendances(classSelected, new Date(), [AttendanceStatus.ABSENT]);
    this.totalCards.onTime = await this.attendanceService.countClassAttendances(classSelected, new Date(), [AttendanceStatus.ON_TIME]);

    this.loggingService.info(`Total Students: ${this.totalCards.totalStudents}`);
    this.loggingService.info(`Total Late: ${this.totalCards.late}`);
    this.loggingService.info(`Total Absent: ${this.totalCards.absent}`);
    this.loggingService.info(`Total On Time: ${this.totalCards.onTime}`);
    this.loggingService.info(`Over All Attendance: ${this.totalCards.overAllAttendance}`);
    // this.attendanceDemographics = {
    //   male: await this.attendanceService.countClassAttendances(classSelected, new Date(), [AttendanceStatus.LATE, AttendanceStatus.ON_TIME], Sex.MALE),
    //   female: await this.attendanceService.countClassAttendances(classSelected, new Date(), [AttendanceStatus.LATE, AttendanceStatus.ON_TIME], Sex.FEMALE)
    // }
  }

  public retrieveClasses(): void {
    this.classService.getAllClasses().subscribe((classes: Class[]) => {
      this.classes = classes;
    });
  }
}
