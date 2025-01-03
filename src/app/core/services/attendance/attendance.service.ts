import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AttendanceForeignEntity} from '../../types/enums/AttendanceForeignEntity';
import {AttendanceStatus} from '../../types/enums/AttendanceStatus';
import {TimeStack} from '../../types/enums/TimeStack';
import {ClassroomDemographicsChart} from '../../types/other/ClassroomDemographicsChart';
import {TimeRange} from '../../types/other/DateRange';
import {Attendance} from '../../types/dto/attendance/Attendance';
import {LineChartDTO} from '../../types/other/LineChartDTO';
import {PageRequest} from '../../types/other/PageRequest';
import {SortRequest} from '../../types/other/SortRequest';
import {UtilService} from '../util/util.service';
import {environment} from '../../../../environments/environment';
import {AttendanceInput} from '../../types/dto/forms/AttendanceInput';
import {ClassroomRanking} from '../../types/dto/classroom/ClassroomRanking';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;
  private readonly utilService = inject(UtilService);

  public countForeignEntityAttendance(
    attendanceStatuses: AttendanceStatus[],
    dateRange: TimeRange,
    foreignEntity: AttendanceForeignEntity,
    id: number
  ) {
    return this.http.get<number>(
      `${this.API_URL}/attendances/${foreignEntity}/${id}/all/count`,
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
    dateRange: TimeRange
  ): Observable<number> {
    const listString =
      this.utilService.attendanceStatusListToString(attendanceStatuses);

    return this.http.get<number>(`${this.API_URL}/attendances/count/status`, {
      params: {
        attendanceStatuses: listString,
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
      },
      responseType: 'json',
    });
  }

  public getLineChart(
    dateRange: TimeRange,
    statuses: AttendanceStatus[],
    timeStack: TimeStack,
    attendanceForeignEntity?: AttendanceForeignEntity,
    id?: number
  ) {
    const statusListString =
      this.utilService.attendanceStatusListToString(statuses);
    return this.http.get<LineChartDTO>(
      `${this.API_URL}/attendances/chart/line`,
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
    dateRange: TimeRange,
    attendanceStatus: AttendanceStatus[],
    classroomId: number
  ) {
    const statusListString =
      this.utilService.attendanceStatusListToString(attendanceStatus);
    return this.http.get<ClassroomDemographicsChart>(
      `${this.API_URL}/attendances/chart/pie/classroom/${classroomId}/demographics`,
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
    dateRange: TimeRange,
    statuses: AttendanceStatus[]
  ): Observable<number> {
    return this.http.get<number>(
      `${this.API_URL}/attendances/STUDENT/${studentId}/all/count`,
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
    dateRange: TimeRange,
    foreignEntity: AttendanceForeignEntity,
    id: number,
    pageRequest?: PageRequest,
    sortRequest?: SortRequest
  ) {
    const statusListString =
      this.utilService.attendanceStatusListToString(attendanceStatuses);
    return this.http.get<Attendance[]>(
      `${this.API_URL}/attendances/${foreignEntity}/${id}/all`,
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
      `${this.API_URL}/attendances/create`,
      attendance,
      {responseType: 'json', params: {override: override}}
    );
  }

  updateAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(
      `${this.API_URL}/attendances/${attendance.id}`,
      attendance,
      {
        responseType: 'json',
      }
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

    return this.http.get<Attendance[]>(`${this.API_URL}/attendances/today`, {
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
    return this.http.get<number>(`${this.API_URL}/attendances/today/count`, {
      params: params,
      responseType: 'json',
    });
  }

  getFilteredAttendances(
    filters: any,
    dateRange: TimeRange,
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

    return this.http.get<Attendance[]>(`${this.API_URL}/attendances/filtered`, {
      params: params,
      responseType: 'json',
    });
  }

  countFilteredAttendances(filters?: any, dateRange?: TimeRange): Observable<number> {
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

    return this.http.get<number>(`${this.API_URL}/attendances/filtered/count`, {
      params: params,
      responseType: 'json',
    });
  }

  getClassroomRanking(dateRange?: TimeRange, limit: number = 5): Observable<ClassroomRanking[]> {
    let params = new HttpParams().set('limit', limit.toString());

    if (dateRange) {
      params = params
        .set('startDate', dateRange.startDate.toISOString().split('T')[0])
        .set('endDate', dateRange.endDate.toISOString().split('T')[0]);
    }

    return this.http.get<ClassroomRanking[]>(`${this.API_URL}/attendances/classroom/ranking`, {
      params: params
    });
  }

  public getLastHourAttendance(attendanceStatuses: AttendanceStatus[]) {
    return this.http.get<number>(`${this.API_URL}/attendances/count/last-hour`, {
      params: {
        attendanceStatuses: this.utilService.attendanceStatusListToString(attendanceStatuses),
      },
    });
  }
}

