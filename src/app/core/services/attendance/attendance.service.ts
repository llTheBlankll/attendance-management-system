import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceForeignEntity } from '../../enums/AttendanceForeignEntity';
import { AttendanceStatus } from '../../enums/AttendanceStatus';
import { TimeStack } from '../../enums/TimeStack';
import { ClassroomDemographicsChart } from '../../interfaces/ClassroomDemographicsChart';
import { DateRange } from '../../interfaces/DateRange';
import { Attendance } from '../../interfaces/dto/attendance/Attendance';
import { LineChartDTO } from '../../interfaces/LineChartDTO';
import { PageRequest } from '../../interfaces/PageRequest';
import { SortRequest } from '../../interfaces/SortRequest';
import { UtilService } from '../util/util.service';
import { environment } from '../../../../environments/environment';
import { AttendanceInput } from '../../interfaces/dto/forms/AttendanceInput';
import { ClassroomRanking } from '../../interfaces/dto/classroom/ClassroomRanking';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly utilService = inject(UtilService);

  public countForeignEntityAttendance(
    attendanceStatuses: AttendanceStatus[],
    dateRange: DateRange,
    foreignEntity: AttendanceForeignEntity,
    id: number
  ) {
    return this.http.get<number>(
      `${this.apiUrl}/attendances/${foreignEntity}/${id}/all/count`,
      {
        params: {
          attendanceStatuses:
            this.utilService.attendanceStatusListToString(attendanceStatuses),
          startDate: dateRange.startDate.toISOString().split('T')[0],
          endDate: dateRange.endDate.toISOString().split('T')[0],
        },
      }
    );
  }

  public countTotalAttendanceByStatus(
    attendanceStatuses: AttendanceStatus[],
    dateRange: DateRange
  ): Observable<number> {
    const listString =
      this.utilService.attendanceStatusListToString(attendanceStatuses);

    return this.http.get<number>(`${this.apiUrl}/attendances/count/status`, {
      params: {
        attendanceStatuses: listString,
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
      `${this.apiUrl}/attendances/chart/line`,
      {
        params: {
          attendanceStatuses: statusListString,
          startDate: dateRange.startDate.toISOString().split('T')[0],
          endDate: dateRange.endDate.toISOString().split('T')[0],
          stack: timeStack,
          ...(attendanceForeignEntity &&
            id && {
              entity: attendanceForeignEntity,
              id: id,
            }),
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
      `${this.apiUrl}/attendances/chart/pie/classroom/${classroomId}/demographics`,
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
      `${this.apiUrl}/attendances/STUDENT/${studentId}/all/count`,
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
      `${this.apiUrl}/attendances/${foreignEntity}/${id}/all`,
      {
        params: {
          attendanceStatuses: statusListString,
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

  addAttendance(
    attendance: AttendanceInput,
    override: boolean = false
  ): Observable<Attendance> {
    return this.http.post<Attendance>(
      `${this.apiUrl}/attendances/create`,
      attendance,
      { responseType: 'json', params: { override: override } }
    );
  }

  updateAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(
      `${this.apiUrl}/attendances/${attendance.id}`,
      attendance
    );
  }

  // Add methods to fetch classrooms, grade levels, and strands if needed
  getTodayAttendances(
    filters: any,
    pageRequest?: PageRequest,
    sortRequest?: SortRequest
  ): Observable<Attendance[]> {
    let params = new HttpParams();
    if (filters.classroomId)
      params = params.set('classroomId', filters.classroomId);
    if (filters.gradeLevelId)
      params = params.set('gradeLevelId', filters.gradeLevelId);
    if (filters.strandId) params = params.set('strandId', filters.strandId);
    if (filters.studentId) params = params.set('studentId', filters.studentId);
    if (pageRequest)
      params = params.set('page', pageRequest.pageNumber.toString());
    if (pageRequest)
      params = params.set('size', pageRequest.pageSize.toString());
    if (sortRequest) params = params.set('sortBy', sortRequest.sortBy);
    if (sortRequest)
      params = params.set('sortDirection', sortRequest.sortDirection);

    return this.http.get<Attendance[]>(`${this.apiUrl}/attendances/today`, {
      params: params,
      responseType: 'json',
    });
  }

  countTodayAttendances(filters?: any): Observable<number> {
    let params = new HttpParams();
    if (filters?.classroomId)
      params = params.set('classroomId', filters.classroomId);
    if (filters?.gradeLevelId)
      params = params.set('gradeLevelId', filters.gradeLevelId);
    if (filters?.strandId) params = params.set('strandId', filters.strandId);
    if (filters?.studentId)
      params = params.set('studentId', filters.studentId);
    return this.http.get<number>(`${this.apiUrl}/attendances/today/count`, {
      params: params,
      responseType: 'json',
    });
  }

  getFilteredAttendances(
    filters: any,
    dateRange: DateRange,
    pageRequest?: PageRequest,
    sortRequest?: SortRequest
  ): Observable<Attendance[]> {
    let params = new HttpParams()
      .set('startDate', dateRange.startDate.toISOString().split('T')[0])
      .set('endDate', dateRange.endDate.toISOString().split('T')[0]);

    if (filters.classroomId) params = params.set('classroomId', filters.classroomId);
    if (filters.gradeLevelId) params = params.set('gradeLevelId', filters.gradeLevelId);
    if (filters.strandId) params = params.set('strandId', filters.strandId);
    if (filters.studentId) params = params.set('studentId', filters.studentId);
    if (pageRequest) {
      params = params.set('page', pageRequest.pageNumber.toString());
      params = params.set('size', pageRequest.pageSize.toString());
    }
    if (sortRequest) {
      params = params.set('sortBy', sortRequest.sortBy);
      params = params.set('sortDirection', sortRequest.sortDirection);
    }

    return this.http.get<Attendance[]>(`${this.apiUrl}/attendances/filtered`, {
      params: params,
      responseType: 'json',
    });
  }

  countFilteredAttendances(filters?: any, dateRange?: DateRange): Observable<number> {
    let params = new HttpParams();
    if (dateRange) {
      params = params
        .set('startDate', dateRange.startDate.toISOString().split('T')[0])
        .set('endDate', dateRange.endDate.toISOString().split('T')[0]);
    }
    if (filters?.classroomId) params = params.set('classroomId', filters.classroomId);
    if (filters?.gradeLevelId) params = params.set('gradeLevelId', filters.gradeLevelId);
    if (filters?.strandId) params = params.set('strandId', filters.strandId);
    if (filters?.studentId) params = params.set('studentId', filters.studentId);

    return this.http.get<number>(`${this.apiUrl}/attendances/filtered/count`, {
      params: params,
      responseType: 'json',
    });
  }

  getClassroomRanking(dateRange?: DateRange, limit: number = 5): Observable<ClassroomRanking[]> {
    let params = new HttpParams().set('limit', limit.toString());

    if (dateRange) {
      params = params
        .set('startDate', dateRange.startDate.toISOString().split('T')[0])
        .set('endDate', dateRange.endDate.toISOString().split('T')[0]);
    }

    return this.http.get<ClassroomRanking[]>(`${this.apiUrl}/attendances/classroom/ranking`, {
      params: params
    });
  }
}
