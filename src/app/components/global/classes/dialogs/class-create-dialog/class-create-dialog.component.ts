import { Component, inject, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { GradeLevel } from '../../../../../interfaces/dto/grade-level/GradeLevel';
import { Teacher } from '../../../../../interfaces/dto/teacher/Teacher';
import { TeacherService } from '../../../../../services/teacher/teacher.service';
import { GradeLevelService } from '../../../../../services/grade-level/grade-level.service';
import { AvatarModule } from 'primeng/avatar';
import { LoggingService } from '../../../../../services/logging/logging.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ClassroomService } from '../../../../../services/classroom/classroom.service';
import { PageRequest } from '../../../../../interfaces/PageRequest';
import { SortRequest } from '../../../../../interfaces/SortRequest';

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
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './class-create-dialog.component.html',
  styleUrl: './class-create-dialog.component.css',
})
export class ClassCreateDialogComponent implements OnInit {
  @Input()
  public isVisible = false;
  classFormGroup = new FormGroup({
    room: new FormControl(''),
    className: new FormControl(''),
    description: new FormControl(''),
    schoolYear: new FormControl(''),
    teacher: new FormControl({} as Teacher),
    gradeLevel: new FormControl({} as GradeLevel),
  });

  protected teachers: Teacher[] = [];
  protected gradeLevels: GradeLevel[] = [];

  // Region: Injections
  private readonly teacherService = inject(TeacherService);

  // End: Injections
  private readonly gradeLevelService = inject(GradeLevelService);
  private readonly classroomService = inject(ClassroomService);
  private readonly loggingService = inject(LoggingService);
  private readonly messageService = inject(MessageService);
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
  public async createClassroom(): Promise<void> {
    // TODO: Create Classroom
    this.loggingService.log(
      `Creating Class: ${JSON.stringify(this.classFormGroup.value)}`
    );

    // ! Validation
    if (!this.validateTeacher() || !this.validateGradeLevel()) {
      return;
    }
  }

  public onLogoSelect(event: FileSelectEvent) {
    // Check if the user selected a file
    if (event.currentFiles.length === 0) {
      this.loggingService.info('Logo not provided, continuing...');
      return;
    }

    // Get the file from the event
    this.classLogo = event.currentFiles[0];
    this.loggingService.info(`Logo: ${this.classLogo.name}`);
  }

  public loadTeachers() {
    this.teacherService.getAllTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers;
    });
  }

  // End: Helper Functions

  /**
   * Retrieves all the grade levels from the GradeLevelService and assigns them
   * to the gradeLevels field of this class.
   * The grade levels are retrieved in ascending order of their name.
   */
  public loadGradeLevels() {
    this.gradeLevelService
      .getAllGradeLevels(
        new PageRequest(0, Number.MAX_VALUE),
        new SortRequest('name', 'Ascending')
      )
      .subscribe((gradeLevels: GradeLevel[]) => {
        this.gradeLevels = gradeLevels;
      });
  }

  // Region: Loads the Teachers, Strands, and Grade Levels in the Dropdowns

  // Region: Helper Functions

  /**
   * Validates the teacher field of the classFormGroup.
   * If the teacher is not selected, an error message is added to the MessageService.
   * @returns {boolean} True if the teacher is selected, false otherwise.
   */

  private validateTeacher() {
    if (!this.classFormGroup.value.teacher) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a teacher.',
      });
      return false;
    }
    return true;
  }

  /**
   * Validates the gradeLevel field of the classFormGroup.
   * If the grade level is not selected, an error message is added to the MessageService.
   * @returns {boolean} True if the grade level is selected, false otherwise.
   */
  private validateGradeLevel() {
    if (!this.classFormGroup.value.gradeLevel) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a grade level.',
      });
      return false;
    }
    return true;
  }

  // End: Loaders
}
