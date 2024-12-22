import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {SortRequest} from '../../types/other/SortRequest';
import {Teacher} from '../../types/dto/teacher/Teacher';
import {PageRequest} from '../../types/other/PageRequest';
import {MessageDTO} from '../../types/other/MessageDTO';
import {environment} from '../../../../environments/environment';
import {SelectItemGroup} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.apiUrl}/teachers/create`, teacher);
  }

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
      },
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

  public getTeacherProfilePicture(teacherId: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/uploads/teacher/${teacherId}/profile-picture`,
      {
        responseType: 'blob',
      }
    );
  }

  public uploadTeacherProfilePicture(
    teacherId: number,
    file: File
  ): Observable<MessageDTO> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<MessageDTO>(
        `${this.apiUrl}/uploads/teacher/${teacherId}/profile-picture`,
        formData,
        {
          headers: new HttpHeaders({Accept: 'application/json'}),
        }
      );
  }

  // ! UTILITY METHODS
  public loadTeacherDropdownOptions(): Observable<SelectItemGroup[]> {
    return this.getAllTeachers().pipe(
      map((teachers) => {
        const groupedTeachers: { [key: string]: Teacher[] } = {};
        teachers.forEach((teacher) => {
          if (!groupedTeachers[teacher.position]) {
            groupedTeachers[teacher.position] = [];
          }
          groupedTeachers[teacher.position].push(teacher);
        });

        return Object.keys(groupedTeachers).map((position) => ({
          label: position,
          items: groupedTeachers[position].map((teacher) => ({
            label: `${teacher.lastName}, ${teacher.firstName}`,
            value: teacher,
          })),
        }));
      })
    );
  }
}
