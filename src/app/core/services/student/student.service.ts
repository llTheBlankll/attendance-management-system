import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageRequest} from '../../types/other/PageRequest';
import {Student} from '../../types/dto/student/Student';
import {SortRequest} from '../../types/other/SortRequest';
import {environment} from '../../../../environments/environment';
import {TimeRange} from '../../types/other/DateRange';
import {LineChartDTO} from '../../types/other/LineChartDTO';
import {MessageDTO} from "../../types/other/MessageDTO";

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly API_URL = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public assignStudentToClassroom(
    studentId: number,
    sectionId: number
  ): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/students/${studentId}/assign-classroom/${sectionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  public addStudent(student: Student) {
    return this.http.post<MessageDTO>(`${this.API_URL}/students/create`, student, {
      responseType: "json"
    });
  }

  public uploadStudentProfilePicture(id: number, profilePicture: File) {
    const formData = new FormData();
    formData.append('file', profilePicture);
    return this.http.post<MessageDTO>(`${this.API_URL}/uploads/student/${id}/profile-picture`, formData, {
      responseType: "json"
    });
  }


  public getAllStudents(
    pageRequest?: PageRequest & { search?: string },
    sortRequest?: SortRequest
  ): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_URL}/students/all`, {
      params: {
        ...pageRequest,
        ...sortRequest,
      },
    });
  }

  public getTotalStudents(classroomId?: number): Observable<number> {
    if (classroomId) {
      return this.http.get<number>(
        `${this.API_URL}/students/count/classroom/${classroomId}`
      );
    } else {
      return this.http.get<number>(`${this.API_URL}/students/count`);
    }
  }

  public getStudent(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.API_URL}/students/${studentId}`);
  }

  public searchStudentsByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_URL}/students/search/name/${name}`);
  }

  public getStudentCountByStrand(strandId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/students/count/strand/${strandId}`);
  }

  public getStudentCountByGradeLevel(gradeLevelId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/students/count/grade-level/${gradeLevelId}`);
  }

  public getAverageStudentsPerStrand(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/students/average-per-strand`);
  }

  public getMostPopularStrand(): Observable<{ strandId: number; strandName: string; studentCount: number }> {
    return this.http.get<{
      strandId: number;
      strandName: string;
      studentCount: number
    }>(`${this.API_URL}/students/most-popular-strand`);
  }

  public getStrandDistribution(dateRange: TimeRange): Observable<LineChartDTO> {
    return this.http.get<LineChartDTO>(`${this.API_URL}/students/strand-distribution`, {
      params: {
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
      },
    });
  }
}
