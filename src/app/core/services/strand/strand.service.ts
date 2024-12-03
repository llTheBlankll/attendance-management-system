import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Strand } from '../../interfaces/dto/strand/Strand';
import { StudentService } from '../student/student.service';
import { DateRange } from '../../interfaces/DateRange';
import { LineChartDTO } from '../../interfaces/LineChartDTO';
import { MessageDTO } from '../../interfaces/MessageDTO';

@Injectable({
  providedIn: 'root'
})
export class StrandService {
  private readonly studentService = inject(StudentService);
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public createStrand(strand: Strand) {
    return this.http.post<MessageDTO>(`${this.apiUrl}/strands/create`, strand, {
      responseType: 'json'
    });
  }

  public getAllStrands(): Observable<Strand[]> {
    return this.http.get<Strand[]>(`${this.apiUrl}/strands/all`);
  }

  public getAllStrandWithStudentCount(): Observable<{ strand: Strand; studentCount: number }[]> {
    return this.getAllStrands().pipe(
      switchMap(strands =>
        forkJoin(
          strands.map(strand =>
            this.studentService.getStudentCountByStrand(strand.id!).pipe(
              map(count => ({ strand, studentCount: count }))
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

  public getStrandDistribution(dateRange: DateRange): Observable<LineChartDTO> {
    return this.studentService.getStrandDistribution(dateRange);
  }
}
