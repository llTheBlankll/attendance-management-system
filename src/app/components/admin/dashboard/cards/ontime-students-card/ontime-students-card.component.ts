import { Component, inject, Input, OnInit } from '@angular/core';
import { AttendanceStatus } from '../../../../../core/enums/AttendanceStatus';
import { TimeRange } from '../../../../../core/interfaces/DateRange';
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
    // Count total attendance for given status and date range
    this.attendanceService
      .countTotalAttendanceByStatus(
        [this.status],
        new TimeRange(this.date, this.date)
      )
      .subscribe({
        next: (count) => {
          this.onTimeStudents = count;
        },
        error: (error) => {
          console.error('Error fetching attendance count:', error);
          this.onTimeStudents = 0; // Set default value on error
        },
      });
  }

  public getLastHourAttendance() {
    // The Date Range should be the current time minus 1 hour
    const oneHourAgo = new Date(this.date.getTime() - 60 * 60 * 1000);
    this.attendanceService
      .countTotalAttendanceByStatus(
        [AttendanceStatus.ON_TIME],
        new TimeRange(oneHourAgo, this.date)
      )
      .subscribe({
        next: (count) => {
          this.onTimeStudents = count;
          console.debug('Last hour attendance count:', count);
        },
        error: (error) => {
          console.error('Error fetching last hour attendance count:', error);
          this.onTimeStudents = 0; // Set default value on error
        },
        complete: () => {
          console.log('Last hour attendance count fetched');
        },
      });
  }
}
