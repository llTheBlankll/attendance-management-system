import {Component, inject, Input, OnInit} from '@angular/core';
import {AttendanceService} from "../../../../../services/attendance/attendance.service";
import {AttendanceStatus} from "../../../../../enums/AttendanceStatus";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-late-students-card',
  standalone: true,
  imports: [],
  templateUrl: './late-students-card.component.html',
  styleUrl: './late-students-card.component.css'
})
export class LateStudentsCardComponent implements OnInit {

  // Injections
  private readonly attendanceService: AttendanceService = inject(AttendanceService);

  lateStudents = 0;

  @Input()
  public date: Date = new Date();

  @Input()
  public status = AttendanceStatus.LATE;

  ngOnInit() {
    this.attendanceService.countTotalByAttendanceByStatus([this.status], this.date).subscribe((total: number) => {
      if (!environment.production) {
        console.log(`Total Late Students: ${total}`);
      }
      this.lateStudents = total;
    })
  }
}
