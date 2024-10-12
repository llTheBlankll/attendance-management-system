import {Component, Input} from '@angular/core';

@Component({
  selector: 'classes-overall-attendance-card',
  standalone: true,
  imports: [],
  templateUrl: './class-over-all-attendance.component.html',
  styleUrl: './class-over-all-attendance.component.css'
})
export class ClassOverAllAttendanceComponent {

  @Input()
  public classOverAllAttendance = 0;
}
