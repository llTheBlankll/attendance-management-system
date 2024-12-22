import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DatePipe} from '@angular/common';
import {Attendance} from '../../../../core/types/dto/attendance/Attendance';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {DividerModule} from 'primeng/divider';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.css'],
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe, PaginatorModule, DividerModule, CalendarModule],
})
export class AttendanceTableComponent {
  @Input()
  attendanceData: {
    paginatedData: Attendance[];
    totalRecords: number;
  } = {
    paginatedData: [],
    totalRecords: 0,
  };
  @Output() onEdit = new EventEmitter<Attendance>();
  @Output() onPageChange = new EventEmitter<{ event: PaginatorState, selectedDate?: Date }>();
  @Output() onDateChange = new EventEmitter<Date>();

  first = 0;
  rows = 10;
  options = [10, 25, 50];
  selectedDate?: Date;

  handlePageChange(event: PaginatorState) {
    this.onPageChange.emit({event, selectedDate: this.selectedDate});
  }

  handleDateChange(event: Date) {
    // Add one day to compensate for timezone offset
    const adjustedDate = new Date(event);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    this.selectedDate = adjustedDate;
    this.onDateChange.emit(adjustedDate);
  }

  editAttendance(attendance: Attendance) {
    this.onEdit.emit(attendance);
  }
}
