import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SortRequest } from '../../interfaces/SortRequest';
import { Teacher } from '../../interfaces/dto/teacher/Teacher';
import { PageRequest } from '../../interfaces/PageRequest';
import { MessageDTO } from '../../interfaces/MessageDTO';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getAllTeachers(
    pageRequest?: PageRequest,
    sortRequest?: SortRequest
  ): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/teachers/all`, {
      params: {
        ...(pageRequest && {
          page: pageRequest.pageNumber,
          size: pageRequest.pageSize,
        }),
        ...(sortRequest && {
          sortBy: sortRequest.sortBy,
          sortDirection: sortRequest.sortDirection,
        }),
      }
    });
  }

  public deleteTeacher(teacherId: number): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.apiUrl}/teachers/${teacherId}`);
  }

  public searchTeacherByName(
    name: string,
    page?: PageRequest,
    sort?: SortRequest
  ): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(
      `${this.apiUrl}/teachers/search/name/${name}`,
      {
        params: {
          ...(page && {
            page: page.pageNumber,
            size: page.pageSize,
          }),
          ...(sort && {
            sortBy: sort.sortBy,
            sortDirection: sort.sortDirection,
          }),
        },
      }
    );
  }
}
