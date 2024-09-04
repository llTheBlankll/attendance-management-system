import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {Teacher} from "../../../../../interfaces/dto/Teacher";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {FirebaseStorageService} from "../../../../../services/storage/firebase-storage.service";
import {LoggingService} from "../../../../../services/logging/logging.service";
import {TeacherService} from "../../../../../services/teacher/teacher.service";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {CreateTeacherDialogComponent} from "../../dialogs/create-teacher-dialog/create-teacher-dialog.component";

@Component({
  selector: 'app-list-of-teachers',
  standalone: true,
  imports: [
    Button,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PrimeTemplate,
    TableModule,
    TooltipModule,
    DialogModule,
    FileUploadModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    ConfirmPopupModule,
    CreateTeacherDialogComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  templateUrl: './list-of-teachers.component.html',
  styleUrl: './list-of-teachers.component.css'
})
export class ListOfTeachersComponent implements OnInit {

  // Injections
  private readonly messageService = inject(MessageService);
  private readonly loggingService = inject(LoggingService);
  private readonly teacherService = inject(TeacherService);
  private readonly confirmationService = inject(ConfirmationService);

  @Input()
  public teachers: Teacher[] = [];

  @Output()
  public teacherSelected: EventEmitter<Teacher> = new EventEmitter<Teacher>();

  ngOnInit() {
    this.retrieveListOfTeachers();
  }

  /**
   * Retrieves the list of all teachers from the Firestore and updates the @Input() teachers.
   * @remarks This function is called when the component is initialized.
   * @summary Retrieve list of teachers from Firestore.
   */
  protected retrieveListOfTeachers() {
    this.loggingService.log("Retrieving list of teachers...");
    this.teachers = [];
    this.teacherService.getAllTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers;
      this.loggingService.log("List of teachers retrieved.");
    }).unsubscribe();
  }

  protected async deleteTeacher(teacher: Teacher, event: Event | null) {
    if (event) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          const status = await this.teacherService.deleteTeacher(teacher);
          if (status) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              icon: 'pi pi-check',
              detail: 'Teacher deleted successfully'
            });
            this.retrieveListOfTeachers();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              icon: 'pi pi-times',
              detail: 'Failed to delete teacher'
            });
          }
        },
        reject: () => {
          this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
        }
      });
    }

  }

  protected filterTeacher(value: string) {
    this.loggingService.info(`Searching for ${value}`);
    if (value === "") {
      this.retrieveListOfTeachers();
      return;
    }

    this.teacherService.searchTeacherByLastName(value).subscribe((teachers: Teacher[]) => {
      this.loggingService.info("Found " + teachers.length + " teacher(s)");
      // * Show a warning if no teachers are found
      if (teachers.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          icon: 'pi pi-exclamation-triangle',
          detail: 'No teachers found'
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          icon: 'pi pi-check',
          detail: 'Found ' + teachers.length + ' teacher(s)'
        });
        this.teachers = teachers;
      }
    });
  }
}
