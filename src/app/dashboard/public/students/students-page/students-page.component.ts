import {Component, inject} from '@angular/core';
import {forkJoin} from 'rxjs';
import {
  StudentAbsentCardComponent
} from '../../../../components/public/students/student-absent-card/student-absent-card.component';
import {
  StudentAttendanceDistributionComponent
} from '../../../../components/public/students/student-attendance-distribution/student-attendance-distribution.component';
import {
  StudentDetailsAndSelectionCardComponent
} from '../../../../components/public/students/student-details-and-selection-card/student-details-and-selection-card.component';
import {
  StudentLateCardComponent
} from '../../../../components/public/students/student-late-card/student-late-card.component';
import {
  StudentOnTimeCardComponent
} from '../../../../components/public/students/student-on-time-card/student-on-time-card.component';
import {
  StudentOverallAttendanceCardComponent
} from '../../../../components/public/students/student-overall-attendance-card/student-overall-attendance-card.component';
import {
  StudentProfileInformationComponent
} from '../../../../components/public/students/student-profile-information/student-profile-information.component';
import {AttendanceForeignEntity} from '../../../../core/types/enums/AttendanceForeignEntity';
import {AttendanceStatus} from '../../../../core/types/enums/AttendanceStatus';
import {TimeRangeConstants} from '../../../../core/types/enums/TimeRange';
import {TimeStack} from '../../../../core/types/enums/TimeStack';
import {TimeRange} from '../../../../core/types/other/DateRange';
import {Student} from '../../../../core/types/dto/student/Student';
import {AttendanceService} from '../../../../core/services/attendance/attendance.service';
import {UtilService} from '../../../../core/services/util/util.service';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {
  AssignSectionDialogComponent
} from '../../../../components/public/students/dialogs/assign-section-dialog/assign-section-dialog.component';
import {
  BulkAssignDialogComponent
} from '../../../../components/public/students/dialogs/bulk-assign-dialog/bulk-assign-dialog.component';
import {
  BulkAddDialogComponent
} from '../../../../components/public/students/dialogs/bulk-add-dialog/bulk-add-dialog.component';
import {ClassroomService} from '../../../../core/services/classroom/classroom.service';
import {StudentService} from '../../../../core/services/student/student.service';
import {ClassroomDTO} from '../../../../core/types/dto/classroom/ClassroomDTO';
import {ConfirmationService} from "primeng/api";
import {
  AddStudentDialogComponent
} from "../../../../components/public/students/dialogs/add-student-dialog/add-student-dialog.component";

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [
    StudentOverallAttendanceCardComponent,
    StudentOnTimeCardComponent,
    StudentLateCardComponent,
    StudentAbsentCardComponent,
    StudentAttendanceDistributionComponent,
    StudentProfileInformationComponent,
    StudentDetailsAndSelectionCardComponent,
    DialogModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    FileUploadModule,
    TableModule,
    FormsModule,
    AssignSectionDialogComponent,
    BulkAssignDialogComponent,
    BulkAddDialogComponent,
    AddStudentDialogComponent,
  ],
  providers: [
    ConfirmationService
  ],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css',
})
export class StudentsPageComponent {
  public monthlyAttendanceChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'On Time',
        data: [92, 22, 31, 39, 65, 47, 34],
      },
      {
        label: 'Late',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
  displayAssignSectionDialog = false;
  displayBulkAssignDialog = false;
  displayBulkAddDialog = false;

  classrooms: ClassroomDTO[] = []; // Populate this with actual section data
  allStudents: Student[] = []; // Populate this with all students
  protected attendanceCard = {
    late: 0,
    onTime: 0,
    absent: 0,
    overAllAttendance: 0,
  };
  protected selectedStudent?: Student;

  // * Injections
  private readonly attendanceService = inject(AttendanceService);
  private readonly classroomService = inject(ClassroomService);
  private readonly studentService = inject(StudentService);
  private readonly utilService = inject(UtilService);

  // * Time Range
  protected monthlyAttendanceTimeRange = this.utilService.timeRangeConstantToDateRange(
    TimeRangeConstants.LAST_180_DAYS
  );
  protected attendanceCardDateRange = this.utilService.timeRangeConstantToDateRange(
    TimeRangeConstants.LAST_30_DAYS
  );

  public onStudentSelect(event: Student) {
    this.selectedStudent = event;
    this.updateAttendanceCard(event);
    this.updateMonthlyAttendanceChart(event);
  }

  public onTimeRangeChange(event: TimeRangeConstants) {
    switch (event) {
      case TimeRangeConstants.LAST_90_DAYS: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_90_DAYS
        );
        break;
      }
      case TimeRangeConstants.LAST_30_DAYS: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_30_DAYS
        );
        break;
      }
      case TimeRangeConstants.LAST_180_DAYS: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_180_DAYS
        );
        break;
      }
      default: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeConstantToDateRange(
          TimeRangeConstants.LAST_90_DAYS
        );
      }
    }

    if (this.selectedStudent !== undefined) {
      this.updateMonthlyAttendanceChart(
        this.selectedStudent,
        this.monthlyAttendanceTimeRange
      );
    }
  }

  public updateMonthlyAttendanceChart(
    student: Student,
    date: TimeRange = this.monthlyAttendanceTimeRange
  ) {
    if (this.selectedStudent) {
      const onTimeLineChart = this.attendanceService.getLineChart(
        date,
        [AttendanceStatus.ON_TIME],
        TimeStack.MONTH,
        AttendanceForeignEntity.STUDENT,
        student.id
      );
      const lateLineChart = this.attendanceService.getLineChart(
        date,
        [AttendanceStatus.LATE],
        TimeStack.MONTH,
        AttendanceForeignEntity.STUDENT,
        student.id
      );
      const absentChart = this.attendanceService.getLineChart(
        date,
        [AttendanceStatus.ABSENT],
        TimeStack.MONTH,
        AttendanceForeignEntity.STUDENT,
        student.id
      );
      forkJoin([onTimeLineChart, lateLineChart, absentChart]).subscribe(
        (values) => {
          console.log(values);
          this.monthlyAttendanceChartData = {
            ...this.monthlyAttendanceChartData,
            labels: values[0].labels,
            datasets: [
              {
                label: 'On Time',
                data: values[0].data,
              },
              {
                label: 'Late',
                data: values[1].data,
              },
              {
                label: 'Absent',
                data: values[2].data,
              },
            ],
          };
        }
      );
    }
  }

  /**
   * Updates the attendance card for a given student by fetching their attendance data
   * for the specified date range and calculating the overall attendance percentage.
   *
   * @param student - The student object containing the student's ID.
   */
  public updateAttendanceCard(student: Student) {
    const onTime = this.attendanceService.totalStudentAttendance(
      student.id,
      this.attendanceCardDateRange,
      [AttendanceStatus.ON_TIME]
    );
    const late = this.attendanceService.totalStudentAttendance(
      student.id,
      this.attendanceCardDateRange,
      [AttendanceStatus.LATE]
    );
    const absent = this.attendanceService.totalStudentAttendance(
      student.id,
      this.attendanceCardDateRange,
      [AttendanceStatus.ABSENT]
    );
    forkJoin([onTime, late, absent]).subscribe((values) => {
      const overAllCountAttendance = values[0] + values[1] + values[2];
      this.attendanceCard = {
        ...this.attendanceCard,
        onTime: values[0],
        late: values[1],
        absent: values[2],
        overAllAttendance: Number(
          (((values[0] + values[1]) / overAllCountAttendance) * 100).toFixed(2)
        ),
      };
    });
  }

  openAssignSectionDialog() {
    this.displayAssignSectionDialog = true;
    this.loadSections();
  }

  openBulkAssignDialog() {
    this.displayBulkAssignDialog = true;
    this.loadSections();
    this.loadAllStudents();
  }

  openBulkAddDialog() {
    this.displayBulkAddDialog = true;
  }

  onAssignSection(section: any) {
    if (this.selectedStudent) {
      console.log(
        `Assigning student ${this.selectedStudent.id} to section ${section.id}`
      );
      // Implement the actual assignment logic here
    }
  }

  onBulkAssignStudents(data: { section: any; students: any[] }) {
    console.log(
      `Assigning ${data.students.length} students to section ${data.section.id}`
    );
    // Implement the actual bulk assignment logic here
  }

  onBulkAddStudents(students: any[]) {
    console.log('Adding students from CSV:', students);
    // Implement the actual bulk add logic here
  }


  private loadSections() {
    // Call your service to get sections
    // this.sectionService.getSections().subscribe(sections => this.sections = sections);
    this.classroomService.listAll().subscribe((classrooms) => {
      this.classrooms = classrooms;
    });
  }

  private loadAllStudents() {
    // Call your service to get all students
    // this.studentService.getAllStudents().subscribe(students => this.allStudents = students);
  }
}
