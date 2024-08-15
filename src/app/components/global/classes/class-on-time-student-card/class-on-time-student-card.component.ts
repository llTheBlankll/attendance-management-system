import {Component, Input} from '@angular/core';

@Component({
  selector: 'classes-on-time-student-card',
  standalone: true,
  imports: [],
  templateUrl: './class-on-time-student-card.component.html',
  styleUrl: './class-on-time-student-card.component.css'
})
export class ClassOnTimeStudentCardComponent {

  @Input()
  public classOnTimeStudent = 0
}
