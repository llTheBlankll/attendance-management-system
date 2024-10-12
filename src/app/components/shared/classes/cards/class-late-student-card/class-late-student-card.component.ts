import {Component, Input} from '@angular/core';

@Component({
  selector: 'classes-late-student-card',
  standalone: true,
  imports: [],
  templateUrl: './class-late-student-card.component.html',
  styleUrl: './class-late-student-card.component.css'
})
export class ClassLateStudentCardComponent {

  @Input()
  public classLateStudents = 0;
}
