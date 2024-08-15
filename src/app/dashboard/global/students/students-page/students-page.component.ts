import {Component} from '@angular/core';
import {
  StudentOverallAttendanceCardComponent
} from "../../../../components/global/students/student-overall-attendance-card/student-overall-attendance-card.component";
import {
  StudentOnTimeCardComponent
} from "../../../../components/global/students/student-on-time-card/student-on-time-card.component";
import {
  StudentLateCardComponent
} from "../../../../components/global/students/student-late-card/student-late-card.component";
import {
  StudentAbsentCardComponent
} from "../../../../components/global/students/student-absent-card/student-absent-card.component";
import {
  StudentAttendanceDistributionComponent
} from "../../../../components/global/students/student-attendance-distribution/student-attendance-distribution.component";
import {
  StudentProfileInformationComponent
} from "../../../../components/global/students/student-profile-information/student-profile-information.component";

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [
    StudentOverallAttendanceCardComponent,
    StudentOnTimeCardComponent,
    StudentLateCardComponent,
    StudentAbsentCardComponent,
    StudentAttendanceDistributionComponent,
    StudentProfileInformationComponent
  ],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent {

}
