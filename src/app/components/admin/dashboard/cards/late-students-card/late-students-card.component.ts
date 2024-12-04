import { Component, inject, Input, OnInit } from '@angular/core';
import { AttendanceStatus } from '../../../../../core/enums/AttendanceStatus';
import { TimeRange } from '../../../../../core/interfaces/DateRange';
import { AttendanceService } from '../../../../../core/services/attendance/attendance.service';

@Component({
  selector: 'app-late-students-card',
  standalone: true,
  imports: [],
  templateUrl: './late-students-card.component.html',
  styleUrl: './late-students-card.component.css',
})
export class LateStudentsCardComponent implements OnInit {
  // Injections
  private readonly attendanceService: AttendanceService =
    inject(AttendanceService);

  lateStudents = 0;

  @Input()
  public date: Date = new Date();

  @Input()
  public status = AttendanceStatus.LATE;

  ngOnInit() {
    this.attendanceService
      .countTotalAttendanceByStatus(
        [this.status],
        new TimeRange(this.date, this.date)
      )
      .subscribe((count) => {
        this.lateStudents = count;
      });
  }
}
