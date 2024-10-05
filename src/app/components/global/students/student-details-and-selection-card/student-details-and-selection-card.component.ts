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
import {LoggingService} from "../../../../services/logging/logging.service";
import {StudentService} from "../../../../services/student/student.service";
import {Student} from "../../../../interfaces/dto/student/Student";
import {PageRequest} from "../../../../interfaces/PageRequest";
import {SortRequest} from "../../../../interfaces/SortRequest";

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
    TooltipModule
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

  public onDeleteStudent(event: any) {

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
