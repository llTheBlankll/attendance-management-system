import {Component, inject, Input, OnInit} from '@angular/core';
import {AttendanceStatus} from '../../../../../core/types/enums/AttendanceStatus';
import {TimeRange} from '../../../../../core/types/other/DateRange';
import {AttendanceService} from '../../../../../core/services/attendance/attendance.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-late-students-card',
  standalone: true,
  imports: [],
  templateUrl: './late-students-card.component.html',
  styleUrl: './late-students-card.component.css',
})
export class LateStudentsCardComponent implements OnInit {
  lateStudents = 0;
  lastHourLateStudents = 0;
  @Input()
  public date: Date = new Date();
  @Input()
  public status = AttendanceStatus.LATE;
  // Injections
  private readonly attendanceService: AttendanceService =
    inject(AttendanceService);

  ngOnInit() {
    this.attendanceService
      .countTotalAttendanceByStatus(
        [this.status],
        new TimeRange(this.date, this.date)
      )
      .subscribe({
        next: (count: number) => {
          this.lateStudents = count;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
        },
        complete: () => {
          this.getLastHourAttendance();
        }
      })
  }

  public getLastHourAttendance() {
    this.attendanceService
      .getLastHourAttendance([AttendanceStatus.LATE])
      .subscribe({
        next: (count) => {
          this.lastHourLateStudents = count;
          console.debug('Last hour LATE attendance count:', count);
        },
        error: (error) => {
          console.error('Error fetching last hour LATE attendance count:', error);
          this.lastHourLateStudents = 0;
        },
        complete: () => {
          console.log('Last hour LATE attendance count fetched');
        },
      });
  }
}
