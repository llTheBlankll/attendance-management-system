import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {Observable} from "rxjs";
import {UtilService} from "../util/util.service";
import {DateRange} from "../../interfaces/DateRange";
import {LineChartDTO} from "../../interfaces/LineChartDTO";
import {MessageDTO} from "../../interfaces/MessageDTO";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private readonly BASE_URL = `${environment.apiUrl}/v1/attendances`;
  private readonly _http = inject(HttpClient);
  private readonly utilService = inject(UtilService);

  public getTotalAttendanceByStatus(attendanceStatus: AttendanceStatus, date: Date): Observable<number> {
    const formattedDate = this.utilService.formatDateToLocalDate(date);
    return this._http.get<number>(`${this.BASE_URL}/status/${attendanceStatus}/date?date=${formattedDate}`);
  }

  public getLineChartByAttendanceStatusAndDate(date: DateRange, attendanceStatus: AttendanceStatus): Observable<LineChartDTO>{
    return this._http.post<LineChartDTO>(`${this.BASE_URL}/graphic-organizers/line-chart`, date, {
      params: {
        attendanceStatus: attendanceStatus
      }
    });
  }

  public getLineChartOfTotalAttendance(dateRange: DateRange): Observable<HttpResponse<LineChartDTO>> {
    return this._http.post<LineChartDTO>(`${this.BASE_URL}/graphic-organizers/total-attendance/line-chart`, dateRange, {
      responseType: "json",
      observe: "response"
    });
  }
}
