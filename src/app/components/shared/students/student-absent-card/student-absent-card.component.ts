import {Component, Input} from '@angular/core';

@Component({
  selector: 'students-absent-card',
  standalone: true,
  imports: [],
  templateUrl: './student-absent-card.component.html',
  styleUrl: './student-absent-card.component.css'
})
export class StudentAbsentCardComponent {

  @Input()
  public totalAbsent = 0;
}
