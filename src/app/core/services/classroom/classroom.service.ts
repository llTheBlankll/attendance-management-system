import { inject, Injectable } from '@angular/core';
import { MessageDTO } from '../../interfaces/MessageDTO';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ClassroomDTO } from '../../interfaces/dto/classroom/ClassroomDTO';
import { PageRequest } from '../../interfaces/PageRequest';
import { SortRequest } from '../../interfaces/SortRequest';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public createClassroom(classroom: ClassroomDTO) {
    return this.http.post<MessageDTO>(
      `${this.apiUrl}/classrooms/create`,
      classroom
    );
  }

  public deleteClassroom(classroomId: number): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(
      `${this.apiUrl}/classrooms/${classroomId}`
    );
  }

  public getClassroom(classroomId: number): Observable<ClassroomDTO> {
    return this.http.get<ClassroomDTO>(
      `${this.apiUrl}/classrooms/${classroomId}`
    );
  }

  public searchClassroomByName(
    name: string,
    pageRequest?: PageRequest,
    sortRequest?: SortRequest
  ): Observable<ClassroomDTO[]> {
    return this.http.get<ClassroomDTO[]>(
      `${this.apiUrl}/classrooms/search/name/${name}`,
      {
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
      }
    );
  }

  public getAllClassrooms(
    pageRequest?: PageRequest,
    sortRequest?: SortRequest
  ): Observable<ClassroomDTO[]> {
    return this.http.get<ClassroomDTO[]>(`${this.apiUrl}/classrooms/all`, {
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

  public getClassroomProfilePicture(classroomId: number): Observable<Blob> {
    return this.http
      .get(`${this.apiUrl}/uploads/classroom/${classroomId}/profile-picture`, {
        responseType: 'blob',
      });
  }

  public uploadClassroomProfilePicture(
    classroomId: number,
    file: File
  ): Observable<MessageDTO> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<MessageDTO>(
        `${this.apiUrl}/classroom/${classroomId}/profile-picture`,
        formData,
        {
          headers: new HttpHeaders({ Accept: 'application/json' }),
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(() => new Error('Classroom not found'));
          } else if (error.status === 400) {
            return throwError(
              () => new Error('Invalid file or no file received')
            );
          } else {
            return throwError(
              () =>
                new Error(
                  'An error occurred while uploading the profile picture'
                )
            );
          }
        })
      );
  }
}
