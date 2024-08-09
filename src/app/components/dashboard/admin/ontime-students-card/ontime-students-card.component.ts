import {Component, inject, Input, OnInit} from '@angular/core';
import {StudentService} from "../../../../services/student/student.service";
import {AttendanceService} from "../../../../services/attendance/attendance.service";
import {AttendanceStatus} from "../../../../enums/AttendanceStatus";
import {environment} from "../../../../../environments/environment";

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
  }
}
