import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { Attendance } from '../../../../core/interfaces/dto/attendance/Attendance';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.css'],
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe],
})
export class AttendanceTableComponent {
  @Input() attendances: Attendance[] = [];
  @Output() onEdit = new EventEmitter<Attendance>();

  editAttendance(attendance: Attendance) {
    this.onEdit.emit(attendance);
  }
}
