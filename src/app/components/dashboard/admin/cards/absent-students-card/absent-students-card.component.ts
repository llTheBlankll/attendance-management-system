import {Component, inject, Input, OnInit} from '@angular/core';
import {AttendanceStatus} from "../../../../../enums/AttendanceStatus";
import {AttendanceService} from "../../../../../services/attendance/attendance.service";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-absent-students-card',
  standalone: true,
  imports: [],
  templateUrl: './absent-students-card.component.html',
  styleUrl: './absent-students-card.component.css'
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
    this.attendanceService.countTotalByAttendanceByStatus([this.status], this.date).subscribe((total: number) => {
      // log the total number of absent student`s
      if (!environment.production) {
        console.log(`Total Absent Students: ${total}`);
      }

      this.absentStudents = total;
    });
  }
}
