import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {
  ClassTotalStudentCardComponent
} from "../../../../components/global/classes/class-total-student-card/class-total-student-card.component";
import {
  ClassOnTimeStudentCardComponent
} from "../../../../components/global/classes/class-on-time-student-card/class-on-time-student-card.component";
import {
  ClassLateStudentCardComponent
} from "../../../../components/global/classes/class-late-student-card/class-late-student-card.component";
import {
  ClassAbsentStudentCardComponent
} from "../../../../components/global/classes/class-absent-student-card/class-absent-student-card.component";
import {
  ClassMonthlyAttendanceCardComponent
} from "../../../../components/global/classes/class-monthly-attendance-card/class-monthly-attendance-card.component";
import {
  ClassAttendanceDemographicsCardComponent
} from "../../../../components/global/classes/class-attendance-demographics-card/class-attendance-demographics-card.component";
import {
  ClassAbsentStudentsListCardComponent
} from "../../../../components/global/classes/class-absent-students-list-card/class-absent-students-list-card.component";
import {
  ClassStudentsListCardComponent
} from "../../../../components/global/classes/class-students-list-card/class-students-list-card.component";
import {
  ClassTodaysActivitiesCardComponent
} from "../../../../components/global/classes/class-todays-activities-card/class-todays-activities-card.component";
import {
  ClassSectionSelectionCardComponent
} from "../../../../components/global/classes/class-section-selection-card/class-section-selection-card.component";

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CardModule,
    ClassTotalStudentCardComponent,
    ClassOnTimeStudentCardComponent,
    ClassLateStudentCardComponent,
    ClassAbsentStudentCardComponent,
    ClassMonthlyAttendanceCardComponent,
    ClassAttendanceDemographicsCardComponent,
    ClassAbsentStudentsListCardComponent,
    ClassStudentsListCardComponent,
    ClassTodaysActivitiesCardComponent,
    ClassSectionSelectionCardComponent
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

}
