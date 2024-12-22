import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AttendanceStatus} from '../../../../core/types/enums/AttendanceStatus';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {Attendance} from '../../../../core/types/dto/attendance/Attendance';
import {MessageService} from 'primeng/api';

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
  ],
  providers: [
    MessageService
  ]
})
export class EditAttendanceFormComponent implements OnInit {
  @Input() attendance: Attendance | null = null;
  @Output() onSave = new EventEmitter<Attendance>();
  editForm: FormGroup;
  attendanceStatuses = Object.values(AttendanceStatus);
  private messageService = inject(MessageService);

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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields',
      });
    }
  }
}
