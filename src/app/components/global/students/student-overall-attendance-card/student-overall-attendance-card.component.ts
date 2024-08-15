import {Component} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'student-overall-attendance-card',
  standalone: true,
  imports: [],
  templateUrl: './student-overall-attendance-card.component.html',
  styleUrl: './student-overall-attendance-card.component.css'
})
export class StudentOverallAttendanceCardComponent {

  protected overAllAttendance = 0;
  protected readonly environment = environment;
}
