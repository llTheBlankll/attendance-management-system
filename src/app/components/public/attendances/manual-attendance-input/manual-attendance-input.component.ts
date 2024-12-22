import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {AttendanceStatus} from '../../../../core/types/enums/AttendanceStatus';
import {AttendanceInput} from '../../../../core/types/dto/forms/AttendanceInput';
import {AttendanceService} from '../../../../core/services/attendance/attendance.service';
import {StudentService} from '../../../../core/services/student/student.service';

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
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class ManualAttendanceInputComponent {
  @Output() onSubmit = new EventEmitter<AttendanceInput>();
  attendanceForm: FormGroup = new FormGroup({
    studentId: new FormControl('', Validators.required),
    status: new FormControl(AttendanceStatus.ON_TIME, Validators.required),
    date: new FormControl(new Date(), Validators.required),
    timeIn: new FormControl(new Date(), Validators.required),
    timeOut: new FormControl(new Date(), Validators.required),
    notes: new FormControl(''),
  });
  attendanceStatuses = Object.keys(AttendanceStatus).map((key) => ({
    label: key,
    value: AttendanceStatus[key as keyof typeof AttendanceStatus],
  }));
  // * Injections
  private readonly studentService: StudentService = inject(StudentService);
  private readonly attendanceService: AttendanceService =
    inject(AttendanceService);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly messageService: MessageService = inject(MessageService);

  submitAttendance() {
    if (this.attendanceForm.valid) {
      this.studentService
        .getStudent(this.attendanceForm.value.studentId)
        .subscribe({
          next: (student) => {
            let attendanceInput: AttendanceInput = {
              student: student,
              status: this.attendanceForm.value.status,
              date: this.attendanceForm.value.date.toISOString().split('T')[0],
              timeIn: this.attendanceForm.value.timeIn
                .toTimeString()
                .split(' ')[0],
              timeOut: this.attendanceForm.value.timeOut
                .toTimeString()
                .split(' ')[0],
              notes: this.attendanceForm.value.notes,
            };
            this.addAttendance(attendanceInput);
          },
          error: (error) => {
            console.error('Error fetching student:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to fetch student information.',
            });
          },
        });
    }
  }

  private addAttendance(attendanceInput: AttendanceInput) {
    this.attendanceService.addAttendance(attendanceInput).subscribe({
      next: (addedAttendance) => {
        this.onSubmit.emit(attendanceInput);
        this.resetForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Attendance added successfully.',
        });
      },
      error: (error) => {
        if (error.status === 409) {
          this.confirmOverride(attendanceInput);
        } else {
          console.error('Error adding attendance:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add attendance.',
          });
        }
      },
    });
  }

  private confirmOverride(attendanceInput: AttendanceInput) {
    this.confirmationService.confirm({
      message:
        'An attendance record already exists for this student on this date. Do you want to override it?',
      header: 'Confirm Override',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.overrideAttendance(attendanceInput);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Attendance override cancelled.',
        });
      },
    });
  }

  private overrideAttendance(attendanceInput: AttendanceInput) {
    this.attendanceService.addAttendance(attendanceInput, true).subscribe({
      next: (overriddenAttendance) => {
        this.onSubmit.emit(attendanceInput);
        this.resetForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Attendance overridden successfully.',
        });
      },
      error: (error) => {
        console.error('Error overriding attendance:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to override attendance.',
        });
      },
    });
  }

  private resetForm() {
    this.attendanceForm.reset({
      status: AttendanceStatus.ON_TIME,
      date: new Date(),
      timeIn: new Date(),
      timeOut: new Date(),
    });
  }
}
