import { Component, inject, Input, OnInit } from '@angular/core';
import { AttendanceStatus } from '../../../../../core/enums/AttendanceStatus';
import { DateRange } from '../../../../../core/interfaces/DateRange';
import { AttendanceService } from '../../../../../core/services/attendance/attendance.service';

@Component({
  selector: 'app-ontime-students-card',
  standalone: true,
  imports: [],
  templateUrl: './ontime-students-card.component.html',
  styleUrl: './ontime-students-card.component.css',
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
    this.attendanceService
      .countTotalAttendanceByStatus(
        [this.status],
        new DateRange(this.date, this.date)
      )
      .subscribe((count) => {
        this.onTimeStudents = count;
      });
  }
}
