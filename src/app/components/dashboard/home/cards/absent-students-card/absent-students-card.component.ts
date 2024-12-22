import {Component, inject, Input, OnInit} from '@angular/core';
import {AttendanceStatus} from '../../../../../core/types/enums/AttendanceStatus';
import {TimeRange} from '../../../../../core/types/other/DateRange';
import {AttendanceService} from '../../../../../core/services/attendance/attendance.service';

@Component({
  selector: 'app-absent-students-card',
  standalone: true,
  imports: [],
  templateUrl: './absent-students-card.component.html',
  styleUrl: './absent-students-card.component.css',
})
export class AbsentStudentsCardComponent implements OnInit {
  absentStudents = 0;
  @Input()
  public date = new Date();
  @Input()
  public status = AttendanceStatus.ABSENT;
  // Injections
  private readonly attendanceService = inject(AttendanceService);

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
