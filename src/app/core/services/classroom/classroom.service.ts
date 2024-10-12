import {inject, Injectable} from '@angular/core';
import {MessageDTO} from "../../interfaces/MessageDTO";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ClassroomDTO} from "../../interfaces/dto/classroom/ClassroomDTO";
import {PageRequest} from "../../interfaces/PageRequest";
import {SortRequest} from "../../interfaces/SortRequest";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public createClassroom(classroom: ClassroomDTO) {
    return this.http.post<MessageDTO>(`${this.apiUrl}/classrooms/create`, classroom);
  }

  public deleteClassroom(classroomId: number): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.apiUrl}/classrooms/${classroomId}`);
  }

  public getClassroom(classroomId: number): Observable<ClassroomDTO> {
    return this.http.get<ClassroomDTO>(`${this.apiUrl}/classrooms/${classroomId}`);
  }

  public searchClassroomByName(name: string, pageRequest?: PageRequest, sortRequest?: SortRequest): Observable<ClassroomDTO[]> {
    return this.http.get<ClassroomDTO[]>(`${this.apiUrl}/classrooms/search/name/${name}`, {
      params: {
        ...(pageRequest && {
          page: pageRequest.pageNumber,
          size: pageRequest.pageSize
        }),
        ...(sortRequest && {
          sortBy: sortRequest.sortBy,
          sortDirection: sortRequest.sortDirection
        })
      }
    });
  }

  public getAllClassrooms(pageRequest?: PageRequest, sortRequest?: SortRequest): Observable<ClassroomDTO[]> {
    return this.http.get<ClassroomDTO[]>(`${this.apiUrl}/classrooms/all`, {
      params: {
        ...(pageRequest && {
          page: pageRequest.pageNumber,
          size: pageRequest.pageSize
        }),
        ...(sortRequest && {
          sortBy: sortRequest.sortBy,
          sortDirection: sortRequest.sortDirection
        })
      }
    });
  }
}
