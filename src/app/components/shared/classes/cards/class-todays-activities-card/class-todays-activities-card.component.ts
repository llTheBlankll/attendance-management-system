import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { AttendanceForeignEntity } from '../../../../../core/enums/AttendanceForeignEntity';
import { AttendanceStatus } from '../../../../../core/enums/AttendanceStatus';
import { DateRange } from '../../../../../core/interfaces/DateRange';
import { ClassroomDTO } from '../../../../../core/interfaces/dto/classroom/ClassroomDTO';
import { EventItem } from '../../../../../core/interfaces/EventItem';
import { PageRequest } from '../../../../../core/interfaces/PageRequest';
import { AttendanceService } from '../../../../../core/services/attendance/attendance.service';

@Component({
  selector: 'classes-today-activities-card',
  standalone: true,
  imports: [CardModule, PrimeTemplate, TimelineModule],
  templateUrl: './class-todays-activities-card.component.html',
  styleUrl: './class-todays-activities-card.component.css',
})
export class ClassTodaysActivitiesCardComponent implements OnChanges {
  private readonly attendanceService = inject(AttendanceService);

  @Input()
  public classroom?: ClassroomDTO;

  public activities: EventItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['classroom'] && this.classroom?.id) {
      this.attendanceService
        .getForeignEntityAttendances(
          [AttendanceStatus.ON_TIME, AttendanceStatus.LATE],
          new DateRange(),
          AttendanceForeignEntity.CLASSROOM,
          this.classroom.id,
          new PageRequest(0, 500000)
        )
        .subscribe((attendances) => {
          this.activities = attendances
            .map((attendance) => [
              {
                studentName: `${attendance.student.firstName}, ${attendance.student.lastName}, ${attendance.student.middleInitial}`,
                status: `Logged in`,
                date: new Date(
                  `${attendance.date} ${attendance.timeIn}`
                ).toLocaleTimeString(),
                icon:
                  'pi pi-' +
                  (attendance.status === AttendanceStatus.ON_TIME
                    ? 'check'
                    : 'clock'),
                color:
                  attendance.status === AttendanceStatus.ON_TIME
                    ? '#9CCC65'
                    : '#ffda52',
              },
              ...(attendance.timeOut
                ? [
                    {
                      studentName: `${attendance.student.firstName}, ${attendance.student.lastName}, ${attendance.student.middleInitial}`,
                      status: `Logged out`,
                      date: new Date(
                        `${attendance.date} ${attendance.timeOut}`
                      ).toLocaleTimeString(),
                      icon: 'pi pi-history',
                      color: '#417ef1',
                    },
                  ]
                : []),
            ])
            .flat()
            .sort((b, a) => a.date.localeCompare(b.date));
        });
    }
  }
}
