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

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CardModule,
    ClassTotalStudentCardComponent,
    ClassOnTimeStudentCardComponent,
    ClassLateStudentCardComponent,
    ClassAbsentStudentCardComponent
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

}
