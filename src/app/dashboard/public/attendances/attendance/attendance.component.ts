import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {AttendanceService} from '../../../../core/services/attendance/attendance.service';
import {
  AttendanceTableComponent
} from '../../../../components/public/attendances/attendance-table/attendance-table.component';
import {
  EditAttendanceFormComponent
} from '../../../../components/public/attendances/edit-attendance-form/edit-attendance-form.component';
import {
  ManualAttendanceInputComponent
} from '../../../../components/public/attendances/manual-attendance-input/manual-attendance-input.component';
import {Attendance} from '../../../../core/types/dto/attendance/Attendance';
import {ClassroomService} from '../../../../core/services/classroom/classroom.service';
import {GradeLevelService} from '../../../../core/services/grade-level/grade-level.service';
import {StrandService} from '../../../../core/services/strand/strand.service';
import {StudentService} from '../../../../core/services/student/student.service';
import {Student} from '../../../../core/types/dto/student/Student';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {AttendanceInput} from '../../../../core/types/dto/forms/AttendanceInput';
import {ClassroomDTO} from '../../../../core/types/dto/classroom/ClassroomDTO';
import {GradeLevel} from '../../../../core/types/dto/grade-level/GradeLevel';
import {Strand} from '../../../../core/types/dto/strand/Strand';
import {PaginatorState} from 'primeng/paginator';
import {PageRequest} from '../../../../core/types/other/PageRequest';
import {TimeRange} from '../../../../core/types/other/DateRange';
import {SortRequest} from '../../../../core/types/other/SortRequest';
import {MessageService} from 'primeng/api';

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
  private attendanceService = inject(AttendanceService);
  private classroomService = inject(ClassroomService);
  private gradeLevelService = inject(GradeLevelService);
  private strandService = inject(StrandService);
  private studentService = inject(StudentService);
  private messageService = inject(MessageService);
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

  handlePageChange(event: { event: PaginatorState, selectedDate?: Date }) {
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
      new TimeRange(date, date) :
      new TimeRange(new Date(), new Date());

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
    this.attendanceService.getFilteredAttendances(filters, dateRange, pageRequest, new SortRequest("status", "Descending")).subscribe({
      next: (attendances) => {
        this.attendanceData.paginatedData = attendances;
      },
      error: (error) => {
        console.error('Error fetching attendances:', error);
      },
    });
  }

  loadClassrooms() {
    this.classroomService.listAll().subscribe(
      (classrooms) => {
        this.classrooms = classrooms;
      },
      (error) => {
        console.error('Error fetching classrooms:', error);
      }
    );
  }

  loadGradeLevels() {
    this.gradeLevelService.getAllGradeLevels().subscribe({
      next: (gradeLevels) => {
        this.gradeLevels = gradeLevels;
      },
      error: (error) => {
        console.error('Error fetching grade levels:', error);
      }
    });
  }

  loadStrands() {
    this.strandService.listAll().subscribe({
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Attendance updated successfully',
        });
      },
      error: (error) => {
        console.error('Error updating attendance:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update attendance',
        });
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
