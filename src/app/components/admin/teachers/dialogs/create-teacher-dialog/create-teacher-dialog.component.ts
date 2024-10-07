import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import {AddTeacherDTO} from '../../../../../interfaces/dto/forms/AddTeacher';
import {Teacher} from '../../../../../interfaces/dto/teacher/Teacher';
import {TeacherService} from '../../../../../services/teacher/teacher.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

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
  // * Injections
  private readonly teacherService = inject(TeacherService);
  private readonly messageService = inject(MessageService);

  // * Form Group for adding teachers
  addTeacherFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleInitial: new FormControl('', Validators.maxLength(3)),
    sex: new FormControl('Male'),
    age: new FormControl(1, Validators.required),
    position: new FormControl('', Validators.required),
    emergencyContact: new FormControl('', Validators.required),
    contactNumber: new FormControl(''),
    pfp: new FormControl(),
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
  public refreshTeachersEmitter: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Adds a new teacher to the Firestore.
   * @remarks This function is called when the user clicks the "Add Teacher" button.
   * @summary Adds a new teacher to the Firestore.
   * @notes The teacher is created with the values from the addTeacherFormGroup.
   * The teacher is then added to the Firestore and the list of teachers is updated.
   *
   */
  public async addTeacher() {
    // TODO: Implement Add Teacher
    console.debug('Add Teacher button clicked.');

    const formTeacher: AddTeacherDTO = this.addTeacherFormGroup.value;
    let teacher: Teacher = {
      age: formTeacher.age,
      contactNumber: formTeacher.contactNumber,
      emergencyContact: formTeacher.emergencyContact,
      lastName: formTeacher.lastName,
      middleInitial: formTeacher.middleInitial,
      firstName: formTeacher.firstName,
      position: formTeacher.position,
      sex: formTeacher.sex.toUpperCase(),
    };

    // Upload the profile picture first if provided
    if (formTeacher.pfp !== null) {
      console.debug('Profile Picture uploading...');
      // uploadResult = await this.storageService.uploadProfilePicture(formTeacher.pfp, teacher);
      // // If uploadResult is null, it means the upload failed
      // if (uploadResult === null) {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     icon: 'pi pi-times',
      //     detail: 'Failed to upload profile picture'
      //   });
      //   this.loggingService.error("Failed to upload profile picture");
      //   return;
      // }
      // console.debug(
      //   'Got profile picture URL: ' + uploadResult.ref.fullPath
      // );
    } else {
      console.debug('Profile Picture not provided, continuing...');
    }

    // // * Update teacher with profile picture URL
    // teacher = {
    //   ...teacher,
    //   photoUrl: uploadResult?.ref.fullPath
    // }
    // console.debug("Teacher: " + JSON.stringify(teacher));
    // // ! Add Teacher to the firebase
    // this.teacherService.addTeacher(teacher);
    // * Show alert
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      icon: 'pi pi-check',
      detail: 'Teacher added successfully',
    });
    this.showDialog = false;
    this.refreshTeachersSignal();
    this.addTeacherFormGroup.reset();
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

    this.addTeacherFormGroup.patchValue({
      pfp: file,
    });
  }

  private refreshTeachersSignal() {
    this.refreshTeachersEmitter.emit();
  }
}
