import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {ClassCreateDialogComponent} from "../../classes/dialogs/class-create-dialog/class-create-dialog.component";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import {Student} from "../../../../interfaces/dto/Student";
import {LoggingService} from "../../../../services/logging/logging.service";
import {StudentService} from "../../../../services/student/student.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'student-details-and-selection-card',
  standalone: true,
  imports: [
    AvatarModule,
    Button,
    CardModule,
    ClassCreateDialogComponent,
    ConfirmPopupModule,
    DropdownModule,
    PrimeTemplate,
    ToastModule,
    TooltipModule,
    FormsModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  templateUrl: './student-details-and-selection-card.component.html',
  styleUrl: './student-details-and-selection-card.component.css'
})
export class StudentDetailsAndSelectionCardComponent {

  private readonly loggingService = inject(LoggingService);
  private readonly studentService = inject(StudentService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  @Output()
  public students: EventEmitter<Student[]> = new EventEmitter<Student[]>();
  public _students: Student[] = [];

  @Output()
  public studentSelected: EventEmitter<Student> = new EventEmitter<Student>();
  public _studentSelected?: Student;

  public onStudentSelectionShow(_: any) {
    // To reduce the read usage of Firebase, we're gonna compare the current count of array `students` to the count of the `students` collection in Firebase.
    // If the count is different, we're gonna call the `loadStudents` method.
    this.studentService.getTotalStudents().subscribe((total: number) => {
      if (this.students.length !== total) {
        this.loadStudents();
      } else {
        this.loggingService.log("Students was already loaded");
      }
    });
  }

  public onStudentSelect(event: DropdownChangeEvent) {
    this.studentSelected.emit(event.value);
    this._studentSelected = event.value;
  }

  public onDeleteStudent(event: any, student?: Student) {
    if (student === undefined) {
      return;
    }

    if (event) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.studentService.deleteStudent(student).then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              icon: 'pi pi-check',
              detail: 'Student deleted successfully'
            });
            this._studentSelected = undefined;
            this.students.emit(this._students);
            this._students = [];
          }).catch(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              icon: 'pi pi-times',
              detail: 'Failed to delete student'
            });
          })
        },
        reject: () => {
          this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
        }
      });
    }
  }

  public loadStudents() {
    this.loggingService.log("Retrieving Students...");
    this.studentService.getAllStudents().subscribe((students: Student[]) => {
      this.loggingService.log("Students Retrieved");
      this.students.emit(students);
      this._students = students;
    });
  }
}
