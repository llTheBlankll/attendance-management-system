import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  PrimeTemplate,
} from 'primeng/api';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CodeStatus } from '../../../../../core/enums/CodeStatus';
import { Teacher } from '../../../../../core/interfaces/dto/teacher/Teacher';
import { MessageDTO } from '../../../../../core/interfaces/MessageDTO';
import { TeacherService } from '../../../../../core/services/teacher/teacher.service';
import { CreateTeacherDialogComponent } from '../../dialogs/create-teacher-dialog/create-teacher-dialog.component';

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
    CreateTeacherDialogComponent,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './list-of-teachers.component.html',
  styleUrl: './list-of-teachers.component.css',
})
export class ListOfTeachersComponent implements OnInit {
  // Injections
  private readonly messageService = inject(MessageService);
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
    console.debug('Retrieving list of teachers...');
    this.teacherService.getAllTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers; // Directly assign the new list
      console.debug(`List of ${this.teachers.length} teachers retrieved.`);
    });
  }

  protected async deleteTeacher(teacher: Teacher, event: Event | null) {
    if (event) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          if (teacher.id !== undefined) {
            // Ensure teacher.id is defined
            const statusObservable = this.teacherService.deleteTeacher(
              teacher.id
            );
            statusObservable.subscribe((status: MessageDTO) => {
              if (status.status == CodeStatus.OK) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  icon: 'pi pi-check',
                  detail: 'Teacher deleted successfully',
                });
                this.retrieveListOfTeachers();
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  icon: 'pi pi-times',
                  detail: 'Failed to delete teacher',
                });
              }
            });
          }
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          });
        },
      });
    }
  }

  private debounceTimeout: any;
  protected filterTeacher(value: string) {
    console.debug(`Searching for ${value}`);
    if (value === '') {
      this.retrieveListOfTeachers();
      return;
    }

    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.teacherService
        .searchTeacherByName(value)
        .subscribe((teachers: Teacher[]) => {
          console.debug('Found ' + teachers.length + ' teacher(s)');
          // * Show a warning if no teachers are found
          if (teachers.length === 0) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              icon: 'pi pi-exclamation-triangle',
              detail: 'No teachers found',
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              icon: 'pi pi-check',
              detail: 'Found ' + teachers.length + ' teacher(s)',
            });
            this.teachers = teachers;
          }
        });
    }, 500);
  }
}
