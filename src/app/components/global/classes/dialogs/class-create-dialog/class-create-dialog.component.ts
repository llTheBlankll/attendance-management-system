import {Component, inject, Input, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {TooltipModule} from "primeng/tooltip";
import {GradeLevel} from "../../../../../interfaces/dto/GradeLevel";
import {Teacher} from "../../../../../interfaces/dto/Teacher";
import {TeacherService} from "../../../../../services/teacher/teacher.service";
import {GradeLevelService} from "../../../../../services/grade-level/grade-level.service";
import {ClassService} from "../../../../../services/class/class.service";
import {AvatarModule} from "primeng/avatar";
import {LoggingService} from "../../../../../services/logging/logging.service";
import {Class} from "../../../../../interfaces/dto/Class";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {FirebaseStorageService} from "../../../../../services/storage/firebase-storage.service";

@Component({
  selector: 'classes-create-dialog',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    FileUploadModule,
    TooltipModule,
    AvatarModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './class-create-dialog.component.html',
  styleUrl: './class-create-dialog.component.css'
})
export class ClassCreateDialogComponent implements OnInit {

  @Input()
  public isVisible = false;
  classFormGroup = new FormGroup({
    room: new FormControl(""),
    className: new FormControl(""),
    description: new FormControl(""),
    schoolYear: new FormControl(""),
    teacher: new FormControl({} as Teacher),
    gradeLevel: new FormControl({} as GradeLevel)
  });
  protected teachers: Teacher[] = [];
  protected gradeLevels: GradeLevel[] = [];
  // Region: Injections
  private readonly teacherService = inject(TeacherService);
  // End: Injections
  private readonly gradeLevelService = inject(GradeLevelService);
  private readonly classService = inject(ClassService);
  private readonly loggingService = inject(LoggingService);
  private readonly messageService = inject(MessageService);
  private readonly storageService = inject(FirebaseStorageService);
  // * Form Group
  private classLogo?: File;

  ngOnInit() {
    this.loadTeachers();
    this.loadGradeLevels();
  }

  /**
   * Creates a new class based on the user's input in the classFormGroup.
   * This function validates the user's input and sends a request to the ClassService
   * to create the class.
   * @returns {Promise<void>}
   */
  public async createClass(): Promise<void> {
    this.loggingService.log(`Creating Class: ${JSON.stringify(this.classFormGroup.value)}`);
    // Instantiate the class
    let classroom = {} as Class;

    // * Assigned Required values
    classroom.room = <string>this.classFormGroup.value.room;
    classroom.className = <string>this.classFormGroup.value.className;
    classroom.description = <string>this.classFormGroup.value.description;
    classroom.schoolYear = <string>this.classFormGroup.value.schoolYear;
    classroom.students = [];
    const teacher = this.classFormGroup.value.teacher;
    const gradeLevel = this.classFormGroup.value.gradeLevel;

    // ! Validation
    if (!this.validateTeacher() || !this.validateGradeLevel()) {
      return;
    }

    // * Assign the values
    classroom.teacher = teacher;
    classroom.gradeLevel = gradeLevel;

    // * Assign Document References
    classroom.teacher = this.teacherService.getTeacherReferenceById(this.classFormGroup.value.teacher?.id?.toString());
    classroom.gradeLevel = this.gradeLevelService.getGradeLevelReferenceById(this.classFormGroup.value.gradeLevel?.id?.toString());

    // ! If the class has a photo
    if (this.classLogo) {
      this.loggingService.log(`Class Logo provided: ${this.classLogo.name}`);
      // * Upload the logo
      const uploadResult = await this.storageService.uploadClassLogo(this.classLogo, classroom);

      // * Check if the upload was not successful.
      if (uploadResult === null) {
        this.loggingService.error(`Class Logo upload failed.`);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Classroom creation failed. Please try again.'
        });
        return;
      }

      classroom.photoUrl = await this.storageService.getClassPicture(classroom);
      this.loggingService.log(`Class Logo uploaded successfully: ${uploadResult.ref.fullPath}`);
    }

    // * Create the classroom
    this.classService.createClass(classroom).then(() => {
      this.loggingService.log(`Classroom created successfully: ${classroom.className}`);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Classroom created successfully.'
      });
      // Close the dialog
      this.isVisible = false;
    }).catch(error => {
      this.loggingService.error(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Classroom creation failed. Please try again.\n${error}`
      });
    });
  }

  public onLogoSelect(event: FileSelectEvent) {
    // Check if the user selected a file
    if (event.currentFiles.length === 0) {
      this.loggingService.info("Logo not provided, continuing...");
      return;
    }

    // Get the file from the event
    this.classLogo = event.currentFiles[0];
    this.loggingService.info(`Logo: ${this.classLogo.name}`);
  }

  public loadTeachers() {
    this.teacherService.getAllTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers
    });
  }

  // End: Helper Functions

  public loadGradeLevels() {
    this.gradeLevelService.getAllGradeLevels().subscribe((gradeLevels: GradeLevel[]) => {
      this.gradeLevels = gradeLevels;
    });
  }

  // Region: Loads the Teachers, Strands, and Grade Levels in the Dropdowns

  // Region: Helper Functions
  private validateTeacher() {
    if (!this.classFormGroup.value.teacher) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a teacher.'
      });
      return false;
    }
    return true;
  }

  private validateGradeLevel() {
    if (!this.classFormGroup.value.gradeLevel) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a grade level.'
      });
      return false;
    }
    return true;
  }

  // End: Loaders
}
