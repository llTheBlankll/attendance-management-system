import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageRequest} from "../../interfaces/PageRequest";
import {Student} from "../../interfaces/dto/student/Student";
import {SortRequest} from "../../interfaces/SortRequest";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public getAllStudents(pageRequest?: PageRequest, sortRequest?: SortRequest): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students/all`, {
      params: {
        ...pageRequest,
        ...sortRequest
      }
    });
  }

  public getTotalStudents(classroomId?: number): Observable<number> {
    if (classroomId) {
      return this.http.get<number>(`${this.apiUrl}/students/count/classroom/${classroomId}`);
    } else {
      return this.http.get<number>(`${this.apiUrl}/students/count`);
    }
  }
}
