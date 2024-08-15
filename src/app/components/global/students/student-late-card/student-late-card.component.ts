import {Component} from '@angular/core';

@Component({
  selector: 'students-late-card',
  standalone: true,
  imports: [],
  templateUrl: './student-late-card.component.html',
  styleUrl: './student-late-card.component.css'
})
export class StudentLateCardComponent {

  protected totalLate = 0;
}
