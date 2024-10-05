import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AttendanceStatus } from '../../enums/AttendanceStatus';
import { DateRange } from '../../interfaces/DateRange';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import { LineChartDTO } from '../../interfaces/LineChartDTO';
import { TimeStack } from '../../enums/TimeStack';
import { AttendanceForeignEntity } from '../../enums/AttendanceForeignEntity';
import { Classroom } from '../../interfaces/dto/classroom/Classroom';
import { ClassroomDemographicsChart } from '../../interfaces/ClassroomDemographicsChart';
import { Attendance } from '../../interfaces/dto/attendance/Attendance';
import { PageRequest } from '../../interfaces/PageRequest';
import { SortRequest } from '../../interfaces/SortRequest';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly utilService = inject(UtilService);

  public countAttendancesInClassroom(
    statuses: AttendanceStatus[],
    dateRange: DateRange,
    classroomId: number
  ) {
    return this.http.get<number>(`${this.apiUrl}/attendances/count/status/`, {
      params: {
        attendanceStatuses:
          this.utilService.attendanceStatusListToString(statuses),
        classroomId: classroomId,
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
      },
    });
  }

  public countTotalAttendanceByStatus(
    attendanceStatuses: AttendanceStatus[],
    dateRange: DateRange,
    foreignEntity?: AttendanceForeignEntity,
    id?: number
  ): Observable<number> {
    const listString =
      this.utilService.attendanceStatusListToString(attendanceStatuses);

    if (foreignEntity && id) {
      return this.http.get<number>(
        `${this.apiUrl}/attendances/count/status/${foreignEntity}/${id}`,
        {
          params: {
            attendanceStatuses: listString,
            startDate: dateRange.startDate.toISOString().split('T')[0],
            endDate: dateRange.endDate.toISOString().split('T')[0],
          },
          responseType: 'json',
        }
      );
    }

    return this.http.get<number>(`${this.apiUrl}/attendances/count/status`, {
      params: {
        status: listString,
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
      },
      responseType: 'json',
    });
  }

  public getLineChart(
    dateRange: DateRange,
    statuses: AttendanceStatus[],
    timeStack: TimeStack,
    attendanceForeignEntity?: AttendanceForeignEntity,
    id?: number
  ) {
    const statusListString =
      this.utilService.attendanceStatusListToString(statuses);
    return this.http.get<LineChartDTO>(
      `${this.apiUrl}/attendances/line/chart`,
      {
        params: {
          attendanceStatuses: statusListString,
          startDate: dateRange.startDate.toISOString().split('T')[0],
          endDate: dateRange.endDate.toISOString().split('T')[0],
          stack: timeStack,
          ...(attendanceForeignEntity && id
            ? { id, attendanceForeignEntity }
            : {}),
        },
        responseType: 'json',
      }
    );
  }

  public getClassroomAttendanceDemographics(
    dateRange: DateRange,
    attendanceStatus: AttendanceStatus[],
    classroomId: number
  ) {
    const statusListString =
      this.utilService.attendanceStatusListToString(attendanceStatus);
    return this.http.get<ClassroomDemographicsChart>(
      `${this.apiUrl}/attendances/chart/demographics/classroom/${classroomId}`,
      {
        params: {
          attendanceStatuses: statusListString,
          startDate: dateRange.startDate.toISOString().split('T')[0],
          endDate: dateRange.endDate.toISOString().split('T')[0],
        },
        responseType: 'json',
      }
    );
  }

  public totalStudentAttendance(
    studentId: number,
    dateRange: DateRange,
    statuses: AttendanceStatus[]
  ): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/attendances/student/${studentId}/count/all`,
      {
        params: {
          startDate: dateRange.startDate.toISOString().split('T')[0],
          endDate: dateRange.endDate.toISOString().split('T')[0],
          attendanceStatuses:
            this.utilService.attendanceStatusListToString(statuses),
        },
      }
    );
  }

  public getForeignEntityAttendances(
    attendanceStatuses: AttendanceStatus[],
    dateRange: DateRange,
    foreignEntity: AttendanceForeignEntity,
    id: number,
    pageRequest?: PageRequest,
    sortRequest?: SortRequest
  ) {
    const statusListString =
      this.utilService.attendanceStatusListToString(attendanceStatuses);
    return this.http.get<Attendance[]>(
      `${this.apiUrl}/attendances/${foreignEntity}/${id}`,
      {
        params: {
          statuses: statusListString,
          startDate: dateRange.startDate.toISOString().split('T')[0],
          endDate: dateRange.endDate.toISOString().split('T')[0],
          ...(pageRequest && {
            page: pageRequest.pageNumber.toString(),
            size: pageRequest.pageSize.toString(),
          }),
          ...(sortRequest && {
            sortBy: sortRequest.sortBy,
            sortDirection: sortRequest.sortDirection,
          }),
        },
        responseType: 'json',
      }
    );
  }
}
