import {Component, inject, Input, OnChanges, SimpleChanges,} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MessageService, SelectItemGroup} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ClassroomDTO} from '../../../../../core/types/dto/classroom/ClassroomDTO';
import {GradeLevel} from '../../../../../core/types/dto/grade-level/GradeLevel';
import {ClassroomService} from '../../../../../core/services/classroom/classroom.service';
import {GradeLevelService} from '../../../../../core/services/grade-level/grade-level.service';
import {TeacherService} from '../../../../../core/services/teacher/teacher.service';
import {UtilService} from '../../../../../core/services/util/util.service';

@Component({
  selector: 'app-class-edit-dialog',
  standalone: true,
  templateUrl: './class-edit-dialog.component.html',
  imports: [
    DropdownModule,
    FileUploadModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
  ],
  styleUrls: ['./class-edit-dialog.component.css'],
})
export class ClassEditDialogComponent implements OnChanges {
  @Input() classroom?: ClassroomDTO;
  isVisible: boolean = false;
  classroomForm: FormGroup = new FormGroup({
    classroomName: new FormControl('', Validators.required),
    room: new FormControl(''),
    schoolYear: new FormControl(null),
    teacher: new FormControl({}),
    gradeLevel: new FormControl({}),
    profilePicture: new FormControl(null),
  });
  schoolYearOptions: any[] = [];
  // Options
  teacherOptions: SelectItemGroup[] = [];
  gradeLevelOptions: GradeLevel[] = [];
  // * Injections
  private readonly teacherService = inject(TeacherService);
  private readonly gradeLevelService = inject(GradeLevelService);
  private readonly classroomService = inject(ClassroomService);
  private readonly messageService = inject(MessageService);
  private readonly utilService = inject(UtilService);

  ngOnChanges(changes: SimpleChanges) {
    console.debug(this.classroom)
    console.debug(changes);
    if (changes['classroom']) {
      this.loadSchoolYearOptions();
      this.loadGradeLevelOptions();
      this.loadTeacherOptions();
      if (this.classroom) {
        this.classroomForm.patchValue({
          classroomName: this.classroom.classroomName,
          room: this.classroom.room,
          schoolYear: this.classroom.schoolYear,
          teacher: this.classroom.teacher ?? null,
          gradeLevel: this.classroom.gradeLevel ?? null,
        });
        console.debug(this.classroomForm.value);
        this.classroomForm.updateValueAndValidity();
      }
    }
  }

  loadTeacherOptions() {
    this.teacherService
      .loadTeacherDropdownOptions()
      .subscribe((teacherOptions) => {
        this.teacherOptions = teacherOptions;
      });
  }

  loadGradeLevelOptions() {
    this.gradeLevelService.getAllGradeLevels().subscribe((gradeLevels) => {
      this.gradeLevelOptions = gradeLevels;
    });
  }

  loadSchoolYearOptions() {
    this.schoolYearOptions = this.utilService.loadSchoolYearOptions();
  }

  onProfilePictureSelect(event: FileSelectEvent) {
    const file = event.files[0];
    console.debug(file);
    this.classroomForm.patchValue({profilePicture: file});
  }

  editClassroom() {
    if (this.classroomForm.valid) {
      // Implement your edit logic here
      console.debug(this.classroomForm.value);
      // Convert FormData to ClassroomDTO
      const formData = this.classroomForm.value;
      const classroomDTO: ClassroomDTO = {
        ...this.classroom,
        classroomName: formData.classroomName,
        room: formData.room,
        schoolYear: formData.schoolYear,
        teacher: formData.teacher,
        gradeLevel: formData.gradeLevel,
        students: [],
      };

      console.debug(classroomDTO);
      this.classroomService.updateClassroom(classroomDTO).subscribe({
        next: (response) => {
          console.debug(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
            life: 3000,
          });
          this.closeDialog();
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields',
        life: 3000,
      });
    }
  }

  closeDialog() {
    this.classroomForm.reset();
    this.isVisible = false;
  }
}
