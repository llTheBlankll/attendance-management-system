import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {DialogModule} from 'primeng/dialog';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {AttendanceService} from '../../../../core/services/attendance/attendance.service';
import { AttendanceTableComponent } from '../../../../components/shared/attendances/attendance-table/attendance-table.component';
import { EditAttendanceFormComponent } from '../../../../components/shared/attendances/edit-attendance-form/edit-attendance-form.component';
import { ManualAttendanceInputComponent } from '../../../../components/shared/attendances/manual-attendance-input/manual-attendance-input.component';
import { Attendance } from '../../../../core/interfaces/dto/attendance/Attendance';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CardModule,
    DialogModule,
    DropdownModule,
    ManualAttendanceInputComponent,
    AttendanceTableComponent,
    EditAttendanceFormComponent
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  todayAttendances: Attendance[] = [];
  editDialogVisible = false;
  selectedAttendance: Attendance | null = null;

  classrooms: string[] = []; // You'll need to populate this
  gradeLevels: string[] = []; // You'll need to populate this
  strands: string[] = []; // You'll need to populate this

  selectedClassroom: string | null = null;
  selectedGradeLevel: string | null = null;
  selectedStrand: string | null = null;

  private readonly attendanceService = inject(AttendanceService);

  ngOnInit() {
    this.loadTodayAttendances();
    // Load filter options (you'll need to implement these methods)
    this.loadClassrooms();
    this.loadGradeLevels();
    this.loadStrands();
  }

  loadTodayAttendances() {
    // Implement the logic to load attendances with filters
    // this.attendanceService.getTodayAttendances(this.selectedClassroom, this.selectedGradeLevel, this.selectedStrand).subscribe(
    //   (attendances) => {
    //     this.todayAttendances = attendances;
    //   },
    //   (error) => {
    //     console.error('Error loading today\'s attendances:', error);
    //   }
    // );
  }

  addAttendance(newAttendance: Attendance) {
    // this.attendanceService.addAttendance(newAttendance).subscribe(
    //   (addedAttendance) => {
    //     this.todayAttendances.push(addedAttendance);
    //   },
    //   (error) => {
    //     console.error('Error adding attendance:', error);
    //   }
    // );
  }

  openEditDialog(attendance: Attendance) {
    this.selectedAttendance = attendance;
    this.editDialogVisible = true;
  }

  updateAttendance(updatedAttendance: Attendance) {
    // this.attendanceService.updateAttendance(updatedAttendance).subscribe(
    //   (result) => {
    //     const index = this.todayAttendances.findIndex(a => a.id === result.id);
    //     if (index !== -1) {
    //       this.todayAttendances[index] = result;
    //     }
    //     this.editDialogVisible = false;
    //   },
    //   (error) => {
    //     console.error('Error updating attendance:', error);
    //   }
    // );
  }

  onFilterChange(event: DropdownChangeEvent) {
    console.log(event.value);
    this.loadTodayAttendances();
  }

  private loadClassrooms() {
    // Implement logic to load classrooms
  }

  private loadGradeLevels() {
    // Implement logic to load grade levels
  }

  private loadStrands() {
    // Implement logic to load strands
  }
}
