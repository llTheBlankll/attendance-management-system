import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {Strand} from '../../types/dto/strand/Strand';
import {StudentService} from '../student/student.service';
import {TimeRange} from '../../types/other/DateRange';
import {LineChartDTO} from '../../types/other/LineChartDTO';
import {MessageDTO} from '../../types/other/MessageDTO';

@Injectable({
  providedIn: 'root'
})
export class StrandService {
  private readonly studentService = inject(StudentService);
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public create(strand: Strand) {
    return this.http.post<Strand>(`${this.apiUrl}/strands/create`, strand, {
      responseType: 'json'
    });
  }

  public update(strand: Strand, id: number) {
    return this.http.put<MessageDTO>(`${this.apiUrl}/strands/${id}`, strand, {
      responseType: 'json'
    });
  }

  public delete(strandId: number): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.apiUrl}/strands/${strandId}`, {
      responseType: 'json'
    });
  }

  public listAll(): Observable<Strand[]> {
    return this.http.get<Strand[]>(`${this.apiUrl}/strands/all`);
  }

  public getAllStrandWithStudentCount(): Observable<{ strand: Strand; studentCount: number }[]> {
    return this.listAll().pipe(
      switchMap(strands =>
        forkJoin(
          strands.map(strand =>
            this.studentService.getStudentCountByStrand(strand.id!).pipe(
              map(count => ({strand, studentCount: count}))
            )
          )
        )
      )
    );
  }

  public getMostPopularStrand(): Observable<{ strandId: number; strandName: string; studentCount: number }> {
    return this.studentService.getMostPopularStrand();
  }

  public getAverageStudentsPerStrand(): Observable<number> {
    return this.studentService.getAverageStudentsPerStrand();
  }

  public getStrandDistribution(dateRange: TimeRange): Observable<LineChartDTO> {
    return this.studentService.getStrandDistribution(dateRange);
  }
}
