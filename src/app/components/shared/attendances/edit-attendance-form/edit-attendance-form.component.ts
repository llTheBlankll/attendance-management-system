import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AttendanceStatus } from '../../../../core/enums/AttendanceStatus';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Attendance } from '../../../../core/interfaces/dto/attendance/Attendance';

@Component({
  selector: 'app-edit-attendance-form',
  templateUrl: './edit-attendance-form.component.html',
  styleUrls: ['./edit-attendance-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule,
    ButtonModule
  ]
})
export class EditAttendanceFormComponent implements OnInit {
  @Input() attendance: Attendance | null = null;
  @Output() onSave = new EventEmitter<Attendance>();

  editForm: FormGroup;
  attendanceStatuses = Object.values(AttendanceStatus);

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      status: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit() {
    if (this.attendance) {
      this.editForm.patchValue({
        status: this.attendance.status,
        notes: this.attendance.notes,
      });
    }
  }

  saveAttendance() {
    if (this.editForm.valid && this.attendance) {
      const updatedAttendance: Attendance = {
        ...this.attendance,
        ...this.editForm.value,
      };
      this.onSave.emit(updatedAttendance);
    }
  }
}
