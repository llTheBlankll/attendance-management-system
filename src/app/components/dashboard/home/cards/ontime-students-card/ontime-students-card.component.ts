import {Component, inject, Input, OnInit} from '@angular/core';
import {AttendanceStatus} from '../../../../../core/types/enums/AttendanceStatus';
import {TimeRange} from '../../../../../core/types/other/DateRange';
import {AttendanceService} from '../../../../../core/services/attendance/attendance.service';

@Component({
  selector: 'app-ontime-students-card',
  standalone: true,
  imports: [],
  templateUrl: './ontime-students-card.component.html',
  styleUrl: './ontime-students-card.component.css',
})
export class OntimeStudentsCardComponent implements OnInit {
  onTimeStudents = 0;
  lastHourOnTimeStudents = 0;
  @Input()
  public date = new Date();
  @Input()
  public status = AttendanceStatus.ON_TIME;
  // Injections
  private readonly attendanceService = inject(AttendanceService);

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
        complete: () => {
          console.log('Attendance count fetched');
          this.getLastHourAttendance();
        },
      });
  }

  public getLastHourAttendance() {
    this.attendanceService
      .getLastHourAttendance([AttendanceStatus.ON_TIME])
      .subscribe({
        next: (count) => {
          this.lastHourOnTimeStudents = count;
          console.debug('Last hour ON TIME attendance count:', count);
        },
        error: (error) => {
          console.error('Error fetching last hour ON TIME attendance count:', error);
          this.lastHourOnTimeStudents = 0; // Set default value on error
        },
        complete: () => {
          console.log('Last hour ON TIME attendance count fetched');
        },
      });
  }
}
