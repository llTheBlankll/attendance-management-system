import {Component} from '@angular/core';

@Component({
  selector: 'student-absent-card',
  standalone: true,
  imports: [],
  templateUrl: './student-absent-card.component.html',
  styleUrl: './student-absent-card.component.css'
})
export class StudentAbsentCardComponent {

  protected totalAbsent = 0;
}
