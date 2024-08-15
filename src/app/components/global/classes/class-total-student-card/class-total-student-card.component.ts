import {Component, Input} from '@angular/core';

@Component({
  selector: 'classes-total-student-card',
  standalone: true,
  imports: [],
  templateUrl: './class-total-student-card.component.html',
  styleUrl: './class-total-student-card.component.css'
})
export class ClassTotalStudentCardComponent {

  @Input()
  public classTotalStudent = 0;
}
