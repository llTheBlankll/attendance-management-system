import {Component, Input} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'students-overall-attendance-card',
  standalone: true,
  imports: [],
  templateUrl: './student-overall-attendance-card.component.html',
  styleUrl: './student-overall-attendance-card.component.css'
})
export class StudentOverallAttendanceCardComponent {

  @Input()
  public overAllAttendance = 0;
  protected readonly environment = environment;
}
