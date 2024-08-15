import {Component, Input} from '@angular/core';

@Component({
  selector: 'classes-absent-student-card',
  standalone: true,
  imports: [],
  templateUrl: './class-absent-student-card.component.html',
  styleUrl: './class-absent-student-card.component.css'
})
export class ClassAbsentStudentCardComponent {

  @Input()
  public classAbsentStudents = 0;
}
