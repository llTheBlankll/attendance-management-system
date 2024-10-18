import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageRequest } from '../../interfaces/PageRequest';
import { Student } from '../../interfaces/dto/student/Student';
import { SortRequest } from '../../interfaces/SortRequest';
import { environment } from '../../../../environments/environment';
import { DateRange } from '../../interfaces/DateRange';
import { LineChartDTO } from '../../interfaces/LineChartDTO';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public assignStudentToClassroom(
    studentId: number,
    sectionId: number
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/students/${studentId}/assign-classroom/${sectionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  public getAllStudents(
    pageRequest?: PageRequest & { search?: string },
    sortRequest?: SortRequest
  ): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students/all`, {
      params: {
        ...pageRequest,
        ...sortRequest,
      },
    });
  }

  public getTotalStudents(classroomId?: number): Observable<number> {
    if (classroomId) {
      return this.http.get<number>(
        `${this.apiUrl}/students/count/classroom/${classroomId}`
      );
    } else {
      return this.http.get<number>(`${this.apiUrl}/students/count`);
    }
  }

  public getStudent(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${studentId}`);
  }

  public searchStudentsByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students/search/name/${name}`);
  }

  public getStudentCountByStrand(strandId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/students/count/strand/${strandId}`);
  }

  public getStudentCountByGradeLevel(gradeLevelId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/students/count/grade-level/${gradeLevelId}`);
  }

  public getAverageStudentsPerStrand(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/students/average-per-strand`);
  }

  public getMostPopularStrand(): Observable<{ strandId: number; strandName: string; studentCount: number }> {
    return this.http.get<{ strandId: number; strandName: string; studentCount: number }>(`${this.apiUrl}/students/most-popular-strand`);
  }

  public getStrandDistribution(dateRange: DateRange): Observable<LineChartDTO> {
    return this.http.get<LineChartDTO>(`${this.apiUrl}/students/strand-distribution`, {
      params: {
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
      },
    });
  }
}
