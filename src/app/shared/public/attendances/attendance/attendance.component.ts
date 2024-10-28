import { Component, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../../../core/services/attendance/attendance.service';
import { AttendanceTableComponent } from '../../../../components/shared/attendances/attendance-table/attendance-table.component';
import { EditAttendanceFormComponent } from '../../../../components/shared/attendances/edit-attendance-form/edit-attendance-form.component';
import { ManualAttendanceInputComponent } from '../../../../components/shared/attendances/manual-attendance-input/manual-attendance-input.component';
import { Attendance } from '../../../../core/interfaces/dto/attendance/Attendance';
import { ClassroomService } from '../../../../core/services/classroom/classroom.service';
import { GradeLevelService } from '../../../../core/services/grade-level/grade-level.service';
import { StrandService } from '../../../../core/services/strand/strand.service';
import { StudentService } from '../../../../core/services/student/student.service';
import { Student } from '../../../../core/interfaces/dto/student/Student';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AttendanceInput } from '../../../../core/interfaces/dto/forms/AttendanceInput';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  standalone: true,
  imports: [
    CardModule,
    DialogModule,
    DropdownModule,
    AutoCompleteModule,
    FormsModule,
    AttendanceTableComponent,
    EditAttendanceFormComponent,
    ManualAttendanceInputComponent,
  ],
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private classroomService = inject(ClassroomService);
  private gradeLevelService = inject(GradeLevelService);
  private strandService = inject(StrandService);
  private studentService = inject(StudentService);

  todayAttendances: Attendance[] = [];
  classrooms: any[] = [];
  gradeLevels: any[] = [];
  strands: any[] = [];
  filteredStudents: Student[] = [];

  selectedClassroom: any;
  selectedGradeLevel: any;
  selectedStrand: any;
  selectedStudent: Student | null = null;

  editDialogVisible = false;
  selectedAttendance: Attendance | null = null;

  private studentSearchSubject = new Subject<string>();

  ngOnInit() {
    this.loadAttendances();
    this.loadClassrooms();
    this.loadGradeLevels();
    this.loadStrands();

    this.studentSearchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchStudents(searchTerm);
      });
  }

  loadAttendances() {
    // this.attendanceService.getTodayAttendances().subscribe(
    //   (attendances) => {
    //     this.todayAttendances = attendances;
    //   },
    //   (error) => {
    //     console.error('Error fetching attendances:', error);
    //   }
    // );
  }

  loadClassrooms() {
    this.classroomService.getAllClassrooms().subscribe(
      (classrooms) => {
        this.classrooms = classrooms;
      },
      (error) => {
        console.error('Error fetching classrooms:', error);
      }
    );
  }

  loadGradeLevels() {
    this.gradeLevelService.getAllGradeLevels().subscribe(
      (gradeLevels) => {
        this.gradeLevels = gradeLevels;
      },
      (error) => {
        console.error('Error fetching grade levels:', error);
      }
    );
  }

  loadStrands() {
    this.strandService.getAllStrands().subscribe({
      next: (strands) => {
        this.strands = strands;
      },
      error: (error) => {
        console.error('Error fetching strands:', error);
      },
    });
  }

  private debounceTimeout: any;
  onFilterChange(event: DropdownChangeEvent) {
    // Implement filter logic here
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.loadAttendances();
    }, 300);
  }

  searchStudents(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.studentService.searchStudentsByName(searchTerm).subscribe({
        next: (students) => {
          this.filteredStudents = students;
        },
        error: (error) => {
          console.error('Error searching students:', error);
        },
      });
    } else {
      this.filteredStudents = [];
    }
  }

  onStudentSearch(event: { query: string }) {
    this.studentSearchSubject.next(event.query);
  }

  onStudentSelect(event: { value: Student }) {
    this.selectedStudent = event.value;
    // Filter attendances based on selected student
    this.loadAttendances();
  }

  openEditDialog(attendance: Attendance) {
    this.selectedAttendance = attendance;
    this.editDialogVisible = true;
  }

  updateAttendance(updatedAttendance: Attendance) {
    this.attendanceService.updateAttendance(updatedAttendance).subscribe({
      next: () => {
        this.loadAttendances();
        this.editDialogVisible = false;
      },
      error: (error) => {
        console.error('Error updating attendance:', error);
      },
    });
  }

  addAttendance(newAttendance: AttendanceInput) {
    this.attendanceService.addAttendance(newAttendance).subscribe({
      next: () => {
        this.loadAttendances();
        this.editDialogVisible = false;
      },
      error: (error) => {
        console.error('Error adding attendance:', error);
      },
    });
  }
}
