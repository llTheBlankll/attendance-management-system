import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {PageRequest} from "../../types/other/PageRequest";
import {StudentSchedule} from "../../types/dto/student/Student";
import {SortRequest} from "../../types/other/SortRequest";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentSchedulesService {

  // Region: INJECTIONS
  private readonly httpClient = inject(HttpClient);

  private readonly API_URL = environment.apiUrl;

  public listAll(pageRequest?: PageRequest, sortRequest?: SortRequest) {
    return this.httpClient.get<StudentSchedule[]>(`${this.API_URL}/student-schedules/all`, {
      responseType: "json"
    });
  }

  public create(studentSchedule: StudentSchedule) {
    return this.httpClient.post<StudentSchedule>(`${this.API_URL}/student-schedules/create`, studentSchedule, {
      responseType: "json"
    });
  }

  public update(updatedStudentSchedule: StudentSchedule, id: number) {
    return this.httpClient.put<StudentSchedule>("${this.API_URL}/student-schedules/update/${id}", updatedStudentSchedule, {
      responseType: "json"
    });
  }

  public delete(id: number) {
    return this.httpClient.delete<StudentSchedule>(`${this.API_URL}/student-schedules/${id}`, {
      responseType: "json"
    });
  }

  public get(id: number) {
    return this.httpClient.get<StudentSchedule>(`${this.API_URL}/student-schedules/${id}`, {
      responseType: "json"
    });
  }
}
