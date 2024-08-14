import {Component, inject, Input, OnInit} from '@angular/core';
import {AttendanceService} from "../../../../../services/attendance/attendance.service";
import {AttendanceStatus} from "../../../../../enums/AttendanceStatus";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-ontime-students-card',
  standalone: true,
  imports: [],
  templateUrl: './ontime-students-card.component.html',
  styleUrl: './ontime-students-card.component.css'
})
export class OntimeStudentsCardComponent implements OnInit {

  // Injections
  private readonly attendanceService = inject(AttendanceService);

  onTimeStudents = 0;

  @Input()
  public date = new Date();

  @Input()
  public status = AttendanceStatus.ON_TIME;

  ngOnInit() {
    this.attendanceService.countTotalByAttendanceByStatus([AttendanceStatus.ON_TIME], this.date).subscribe((total: number) => {
      if (!environment.production) {
        console.log(`Total On Time Students: ${total}`);
      }
      this.onTimeStudents = total;
    })
  }
}
