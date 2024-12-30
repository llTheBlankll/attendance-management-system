import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {Student, StudentSchedule} from "../../../../../core/types/dto/student/Student";
import {MessageService} from "primeng/api";
import {ClassroomDTO} from "../../../../../core/types/dto/classroom/ClassroomDTO";
import {Strand} from "../../../../../core/types/dto/strand/Strand";
import {StrandService} from "../../../../../core/services/strand/strand.service";
import {ClassroomService} from "../../../../../core/services/classroom/classroom.service";
import {StudentSchedulesService} from "../../../../../core/services/student-schedules/student-schedules.service";
import {HttpErrorResponse} from "@angular/common/http";
import {GradeLevel} from "../../../../../core/types/dto/grade-level/GradeLevel";
import {GradeLevelService} from "../../../../../core/services/grade-level/grade-level.service";
import {StudentService} from "../../../../../core/services/student/student.service";
import {MessageDTO} from "../../../../../core/types/other/MessageDTO";
import {CalendarModule} from "primeng/calendar";
import {CodeStatus} from "../../../../../core/types/enums/CodeStatus";

@Component({
  selector: 'app-add-student-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TooltipModule,
    CalendarModule
  ],
  templateUrl: './add-student-dialog.component.html',
  styleUrl: './add-student-dialog.component.css'
})
export class AddStudentDialogComponent implements OnInit {

  @Input()
  visible: boolean = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Output()
  studentAdded = new EventEmitter<Student>();

  // Region: Student Form Data
  studentForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    middleInitial: new FormControl(""),
    lastName: new FormControl("", [Validators.required]),
    prefix: new FormControl(""),
    sex: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    birthDate: new FormControl("", [Validators.required]),
    gradeLevel: new FormControl(null),
    classroom: new FormControl(null, [Validators.required]),
    strand: new FormControl(null, [Validators.required]),
    schedule: new FormControl(null, [Validators.required]),
  });
  selectedProfilePicture?: File;

  // Region: Student data dropdowns
  public gradeLevels: GradeLevel[] = [];
  public classrooms: ClassroomDTO[] = [];
  public strands: Strand[] = [];
  public schedules: StudentSchedule[] = [];

  // Region: INJECTIONS
  private readonly strandService = inject(StrandService);
  private readonly studentService = inject(StudentService);
  private readonly classroomService = inject(ClassroomService);
  private readonly studentScheduleService = inject(StudentSchedulesService);
  private readonly messageService = inject(MessageService);
  private readonly gradeLevelService = inject(GradeLevelService);

  public submit() {
    if (this.studentForm.valid) {
      console.debug("Form received!", this.studentForm.value);

      let student = this.studentForm.value as Student;
      student.birthDate = new Date(student.birthDate).toISOString().split("T")[0];
      this.studentService.addStudent(student).subscribe({
        next: (response: MessageDTO) => {
          switch (response.status) {
            case CodeStatus.OK: {
              this.studentAdded.emit(student);
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: response.message
              });

              if (this.selectedProfilePicture) {
                this.uploadProfilePicture(student.id!);
              }
              break;
            }
            case CodeStatus.EXISTS: {
              this.messageService.add({
                severity: "warn",
                summary: "Cannot add student",
                detail: response.message
              });
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          const message: MessageDTO = error.message as unknown as MessageDTO
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: message.message
          });
        }
      });
    } else {
      console.debug(
        this.studentForm.value
      );
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please fill up all fields required."
      });
    }
  }

  ngOnInit(): void {
    this.loadStrands();
    this.loadClassrooms();
    this.loadStudentSchedules();
    this.loadGradeLevels();
  }

  // Region: Upload

  private uploadProfilePicture(studentId: number) {
    if (this.selectedProfilePicture !== undefined) {
      this.studentService.uploadStudentProfilePicture(studentId, this.selectedProfilePicture).subscribe({
        next: (response: MessageDTO) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message
          });

          this.studentForm.reset();
          this.visibleChange.emit(false);
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message
          });
        }
      })
    }
  }

  public onSelectProfilePicture(event: FileSelectEvent) {
    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: "Student profile picture selected."
    });

    // Check if has files
    if (event.files.length > 0) {
      const file = event.files[0];
      console.debug("Selected file", file.name);
      this.selectedProfilePicture = file;
    }
  }

  // Region: PRIVATE METHODS
  private loadStrands() {
    this.strandService.listAll().subscribe({
      next: (strands) => {
        this.strands = strands;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.message
        });
      }
    });
  }

  private loadClassrooms() {
    this.classroomService.listAll().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.message
        });
      }
    });
  }

  private loadStudentSchedules() {
    this.studentScheduleService.listAll().subscribe({
      next: (schedules) => {
        console.debug("Schedules received!", schedules);
        this.schedules = schedules;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.message
        })
      }
    });
  }

  private loadGradeLevels() {
    this.gradeLevelService.getAllGradeLevels().subscribe({
      next: (gradeLevels: GradeLevel[]) => {
        this.gradeLevels = gradeLevels;
      }
    })
  }
}
