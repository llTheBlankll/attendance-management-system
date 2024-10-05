import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {of} from "rxjs";
import {Sex} from "../../../../../enums/Sex";
import {Student} from "../../../../../interfaces/dto/student/Student";

@Component({
  selector: 'classes-absent-students-list-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './class-absent-students-list-card.component.html',
  styleUrl: './class-absent-students-list-card.component.css'
})
export class ClassAbsentStudentsListCardComponent {

  @Input()
  public absentStudents?: Student[];

  protected readonly of = of;
  protected readonly Sex = Sex;
}
