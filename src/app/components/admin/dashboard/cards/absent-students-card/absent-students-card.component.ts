import { Component, inject, Input, OnInit } from '@angular/core';
import { AttendanceStatus } from '../../../../../core/enums/AttendanceStatus';
import { TimeRange } from '../../../../../core/interfaces/DateRange';
import { AttendanceService } from '../../../../../core/services/attendance/attendance.service';

@Component({
  selector: 'app-absent-students-card',
  standalone: true,
  imports: [],
  templateUrl: './absent-students-card.component.html',
  styleUrl: './absent-students-card.component.css',
})
export class AbsentStudentsCardComponent implements OnInit {
  // Injections
  private readonly attendanceService = inject(AttendanceService);

  absentStudents = 0;

  @Input()
  public date = new Date();

  @Input()
  public status = AttendanceStatus.ABSENT;
  ngOnInit() {
    this.attendanceService
      .countTotalAttendanceByStatus(
        [this.status],
        new TimeRange(this.date, this.date)
      )
      .subscribe((count) => {
        this.absentStudents = count;
      });
  }
}
