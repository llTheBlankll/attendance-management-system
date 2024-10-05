import {Component, Input, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Student} from "../../../../../interfaces/dto/student/Student";

@Component({
  selector: 'classes-students-list-card',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    ButtonDirective,
    Ripple,
    Button
  ],
  templateUrl: './class-students-list-card.component.html',
  styleUrl: './class-students-list-card.component.css'
})
export class ClassStudentsListCardComponent {

  @Input()
  public students: Student[] = [];

  public viewStudent(student: Student) {
    console.log(student);
  }
}
