import {Component, inject} from '@angular/core';
import {
  StudentOverallAttendanceCardComponent
} from '../../../../components/global/students/student-overall-attendance-card/student-overall-attendance-card.component';
import {
  StudentOnTimeCardComponent
} from '../../../../components/global/students/student-on-time-card/student-on-time-card.component';
import {
  StudentLateCardComponent
} from '../../../../components/global/students/student-late-card/student-late-card.component';
import {
  StudentAbsentCardComponent
} from '../../../../components/global/students/student-absent-card/student-absent-card.component';
import {
  StudentAttendanceDistributionComponent
} from '../../../../components/global/students/student-attendance-distribution/student-attendance-distribution.component';
import {
  StudentProfileInformationComponent
} from '../../../../components/global/students/student-profile-information/student-profile-information.component';
import {
  StudentDetailsAndSelectionCardComponent
} from '../../../../components/global/students/student-details-and-selection-card/student-details-and-selection-card.component';
import {AttendanceService} from '../../../../services/attendance/attendance.service';
import {UtilService} from '../../../../services/util/util.service';
import {TimeRange} from '../../../../enums/TimeRange';
import {AttendanceStatus} from '../../../../enums/AttendanceStatus';
import {firstValueFrom, forkJoin} from 'rxjs';
import {DateRange} from '../../../../interfaces/DateRange';
import {TimeStack} from '../../../../enums/TimeStack';
import {AttendanceForeignEntity} from '../../../../enums/AttendanceForeignEntity';
import {Student} from '../../../../interfaces/dto/student/Student';

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
  ],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css',
})
export class StudentsPageComponent {
  // * Injections
  private readonly attendanceService = inject(AttendanceService);
  private readonly utilService = inject(UtilService);

  protected attendanceCard = {late: 0, onTime: 0, absent: 0, overAllAttendance: 0};
  protected monthlyAttendanceTimeRange = this.utilService.timeRangeToDateRange(TimeRange.LAST_180_DAYS);
  protected attendanceCardDateRange = this.utilService.timeRangeToDateRange(TimeRange.LAST_30_DAYS);

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

  protected selectedStudent?: Student;

  public onStudentSelect(event: Student) {
    this.selectedStudent = event;
    this.updateAttendanceCard(event);
    this.updateMonthlyAttendanceChart(event);
  }

  public onTimeRangeChange(event: TimeRange) {
    switch (event) {
      case TimeRange.LAST_90_DAYS: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeToDateRange(
          TimeRange.LAST_90_DAYS
        );
        break;
      }
      case TimeRange.LAST_30_DAYS: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeToDateRange(
          TimeRange.LAST_30_DAYS
        );
        break;
      }
      case TimeRange.LAST_180_DAYS: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeToDateRange(
          TimeRange.LAST_180_DAYS
        );
        break;
      }
      default: {
        this.monthlyAttendanceTimeRange = this.utilService.timeRangeToDateRange(
          TimeRange.LAST_90_DAYS
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
    date: DateRange = this.monthlyAttendanceTimeRange
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
    const onTime =
      this.attendanceService.totalStudentAttendance(
        student.id,
        this.attendanceCardDateRange,
        [AttendanceStatus.ON_TIME]
      );
    const late =
      this.attendanceService.totalStudentAttendance(
        student.id,
        this.attendanceCardDateRange,
        [AttendanceStatus.LATE]
      );
    const absent =
      this.attendanceService.totalStudentAttendance(
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
}
