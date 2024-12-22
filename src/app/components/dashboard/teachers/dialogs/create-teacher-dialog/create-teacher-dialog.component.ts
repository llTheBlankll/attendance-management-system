import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {AddTeacherDTO} from '../../../../../core/types/dto/forms/AddTeacher';
import {Teacher} from '../../../../../core/types/dto/teacher/Teacher';
import {TeacherService} from '../../../../../core/services/teacher/teacher.service';
import {BehaviorSubject, firstValueFrom} from 'rxjs';

@Component({
  selector: 'admin-teachers-create-teacher-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    TooltipModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './create-teacher-dialog.component.html',
  styleUrl: './create-teacher-dialog.component.css',
})
export class CreateTeacherDialogComponent {
  // * Form Group for adding teachers
  addTeacherFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleInitial: new FormControl('', Validators.maxLength(3)),
    sex: new FormControl('Male'),
    age: new FormControl(1, Validators.required),
    position: new FormControl('', Validators.required),
    emergencyContact: new FormControl('', Validators.required),
    contactNumber: new FormControl('')
  });
  teacherPositions = [
    'Teacher I',
    'Teacher II',
    'Teacher III',
    'Teacher IV',
    'Teacher V',
    'Teacher VI',
    'Teacher VII',
    'Master Teacher I',
    'Master Teacher II',
    'Master Teacher III',
    'Master Teacher IV',
    'Head Teacher I',
    'Head Teacher II',
    'Head Teacher III',
    'Head Teacher IV',
    'Head Teacher V',
    'Head Teacher VI',
    'Principal I',
    'Principal II',
    'Principal III',
    'Principal IV',
    'Principal V',
    'Principal VI',
  ];
  @Input()
  public showDialog = false;
  @Output()
  public refreshTeachersTable: EventEmitter<void> = new EventEmitter<void>();
  // * Injections
  private readonly teacherService = inject(TeacherService);
  private readonly messageService = inject(MessageService);
  private readonly fileSelected: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

  /**
   * Adds a new teacher and uploads their profile picture if provided.
   * @remarks This function is called when the user clicks the "Add Teacher" button.
   * @summary Adds a new teacher to the database and uploads their profile picture.
   */
  public async addTeacher() {
    console.debug('Add Teacher button clicked.');

    const formTeacher: AddTeacherDTO = this.addTeacherFormGroup.value;
    const teacher: Teacher = {
      age: formTeacher.age,
      contactNumber: formTeacher.contactNumber,
      emergencyContact: formTeacher.emergencyContact,
      lastName: formTeacher.lastName,
      middleInitial: formTeacher.middleInitial,
      firstName: formTeacher.firstName,
      position: formTeacher.position,
      sex: formTeacher.sex.toUpperCase(),
    };

    try {
      // Add the teacher first
      const addedTeacher = await firstValueFrom(
        this.teacherService.addTeacher(teacher)
      );

      if (!addedTeacher || !addedTeacher.id) {
        throw new Error('Failed to add teacher');
      }

      // Upload the profile picture if provided
      if (this.fileSelected.getValue() !== null) {
        console.debug('Profile Picture uploading...');
        const file = this.fileSelected.getValue();
        if (!file) {
          throw new Error('No file selected');
        }
        await firstValueFrom(
          this.teacherService.uploadTeacherProfilePicture(
            addedTeacher.id,
            file
          )
        );
        console.debug('Profile Picture uploaded successfully');
      } else {
        console.debug('Profile Picture not provided, continuing...');
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        icon: 'pi pi-check',
        detail: 'Teacher added successfully',
      });
      this.showDialog = false;
      this.refreshTeachersSignal();
      this.addTeacherFormGroup.reset();
    } catch (error) {
      console.error('Error adding teacher:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        icon: 'pi pi-times',
        detail: 'Failed to add teacher',
      });
    }
  }

  protected onProfilePictureChange(event: FileSelectEvent) {
    // Check if the user selected a file
    if (event.currentFiles.length === 0) {
      console.debug('Profile Picture not provided, continuing...');
      return;
    }

    console.debug('Profile Picture selected');
    const file = event.currentFiles[0];
    console.debug(`Profile Picture: ${file.name}`);
    this.fileSelected.next(file);
    // Get the current value of the fileSelected BehaviorSubject
  }

  private refreshTeachersSignal() {
    this.refreshTeachersTable.emit();
  }
}
