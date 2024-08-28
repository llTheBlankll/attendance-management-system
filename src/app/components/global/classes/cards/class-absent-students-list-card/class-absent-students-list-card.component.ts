import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CardModule} from "primeng/card";
import {Student} from "../../../../../interfaces/dto/Student";
import {of} from "rxjs";
import {Sex} from "../../../../../enums/Sex";

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
  public absentStudents?: Student[] = undefined;
  protected readonly of = of;
  protected readonly Sex = Sex;
}
