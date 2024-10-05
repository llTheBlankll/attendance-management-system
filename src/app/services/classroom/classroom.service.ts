import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MessageDTO} from "../../interfaces/MessageDTO";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Classroom} from "../../interfaces/dto/classroom/Classroom";
import {PageRequest} from "../../interfaces/PageRequest";
import {SortRequest} from "../../interfaces/SortRequest";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public deleteClassroom(classroomId: number): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.apiUrl}/classrooms/${classroomId}`);
  }

  public getClassroom(classroomId: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.apiUrl}/classrooms/${classroomId}`);
  }

  public getAllClassrooms(pageRequest?: PageRequest, sortRequest?: SortRequest): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.apiUrl}/classrooms/all`, {
      params: {
        ...pageRequest,
        ...sortRequest
      }
    });
  }
}
