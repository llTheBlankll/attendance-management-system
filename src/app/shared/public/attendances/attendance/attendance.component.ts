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
import { Attendance, AttendanceForeignEntity } from '../../../../core/interfaces/dto/attendance/Attendance';
import { ClassroomService } from '../../../../core/services/classroom/classroom.service';
import { GradeLevelService } from '../../../../core/services/grade-level/grade-level.service';
import { StrandService } from '../../../../core/services/strand/strand.service';
import { StudentService } from '../../../../core/services/student/student.service';
import { Student } from '../../../../core/interfaces/dto/student/Student';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AttendanceInput } from '../../../../core/interfaces/dto/forms/AttendanceInput';
import { ClassroomDTO } from '../../../../core/interfaces/dto/classroom/ClassroomDTO';
import { GradeLevel } from '../../../../core/interfaces/dto/grade-level/GradeLevel';
import { Strand } from '../../../../core/interfaces/dto/strand/Strand';
import { PaginatorState } from 'primeng/paginator';
import { PageRequest } from '../../../../core/interfaces/PageRequest';
import { AttendanceStatus } from '../../../../core/enums/AttendanceStatus';
import { DateRange } from '../../../../core/interfaces/DateRange';

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

  attendanceData: {
    paginatedData: Attendance[];
    totalRecords: number;
  } = {
    paginatedData: [],
    totalRecords: 0,
  };
  classrooms: ClassroomDTO[] = [];
  gradeLevels: GradeLevel[] = [];
  strands: Strand[] = [];
  filteredStudents: Student[] = [];

  selectedClassroom?: ClassroomDTO;
  selectedGradeLevel?: GradeLevel;
  selectedStrand?: Strand;
  selectedStudent: Student | null = null;

  editDialogVisible = false;
  selectedAttendance: Attendance | null = null;

  private studentSearchSubject = new Subject<string>();

  ngOnInit() {
    this.loadAttendanceData();
    this.loadClassrooms();
    this.loadGradeLevels();
    this.loadStrands();

    this.studentSearchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchStudents(searchTerm);
      });
  }

  handlePageChange(event: {event: PaginatorState, selectedDate?: Date}) {
    console.debug('Page change:', event);
    const pageRequest = {
      pageNumber: event.event.first ? Math.floor(event.event.first / (event.event.rows || 10)) : 0,
      pageSize: event.event.rows || 10
    };
    this.loadAttendanceData(pageRequest, event.selectedDate);
  }

  handleDateChange(event: Date) {
    console.debug('Date change:', event);
    this.loadAttendanceData(undefined, event);
  }

  loadAttendanceData(pageRequest?: PageRequest, date?: Date) {
    const filters = {
      classroomId: this.selectedClassroom?.id,
      gradeLevelId: this.selectedGradeLevel?.id,
      strandId: this.selectedStrand?.id,
      studentId: this.selectedStudent?.id,
    };

    const dateRange = date ?
      new DateRange(date, date) :
      new DateRange(new Date(), new Date());

    // First get the total count
    this.attendanceService.countFilteredAttendances(filters, dateRange).subscribe({
      next: (totalRecords) => {
        this.attendanceData.totalRecords = totalRecords;
      },
      error: (error) => {
        console.error('Error fetching total records:', error);
      },
    });

    // Get paginated attendance data
    this.attendanceService.getFilteredAttendances(filters, dateRange, pageRequest).subscribe({
      next: (attendances) => {
        this.attendanceData.paginatedData = attendances;
      },
      error: (error) => {
        console.error('Error fetching attendances:', error);
      },
    });
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

  onFilterChange(event: DropdownChangeEvent) {
    if (event.value !== null) {
      this.selectedStudent = null;
    }
    this.loadAttendanceData();
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
    this.selectedClassroom = undefined;
    this.selectedGradeLevel = undefined;
    this.selectedStrand = undefined;
    this.loadAttendanceData();
  }

  openEditDialog(attendance: Attendance) {
    this.selectedAttendance = attendance;
    this.editDialogVisible = true;
  }

  updateAttendance(updatedAttendance: Attendance) {
    this.attendanceService.updateAttendance(updatedAttendance).subscribe({
      next: () => {
        this.loadAttendanceData();
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
        this.loadAttendanceData();
      },
      error: (error) => {
        console.error('Error adding attendance:', error);
      },
    });
  }
}
