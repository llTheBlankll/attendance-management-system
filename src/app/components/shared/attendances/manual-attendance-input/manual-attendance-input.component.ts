import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AttendanceStatus } from '../../../../core/enums/AttendanceStatus';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manual-attendance-input',
  templateUrl: './manual-attendance-input.component.html',
  styleUrls: ['./manual-attendance-input.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    ButtonModule
  ]
})
export class ManualAttendanceInputComponent {
  @Output() onSubmit = new EventEmitter<any>();

  attendanceForm: FormGroup;
  attendanceStatuses = Object.keys(AttendanceStatus).map(key => ({
    label: key,
    value: AttendanceStatus[key as keyof typeof AttendanceStatus]
  }));

  constructor(private fb: FormBuilder) {
    this.attendanceForm = this.fb.group({
      studentId: ['', Validators.required],
      status: [AttendanceStatus.ON_TIME, Validators.required],
      date: [new Date(), Validators.required],
      notes: ['']
    });
  }

  submitAttendance() {
    if (this.attendanceForm.valid) {
      this.onSubmit.emit(this.attendanceForm.value);
      this.attendanceForm.reset({
        status: AttendanceStatus.ON_TIME,
        date: new Date()
      });
    }
  }
}
