import {Component, Input} from '@angular/core';

@Component({
  selector: 'students-on-time-card',
  standalone: true,
  imports: [],
  templateUrl: './student-on-time-card.component.html',
  styleUrl: './student-on-time-card.component.css'
})
export class StudentOnTimeCardComponent {

  @Input()
  public totalOnTime = 0;

}
