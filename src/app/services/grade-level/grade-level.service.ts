import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageRequest } from '../../interfaces/PageRequest';
import { SortRequest } from '../../interfaces/SortRequest';
import { GradeLevel } from '../../interfaces/dto/grade-level/GradeLevel';

@Injectable({
  providedIn: 'root',
})
export class GradeLevelService {
  private readonly apiUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);

  public getAllGradeLevels(page?: PageRequest, sort?: SortRequest) {
    return this.http.get<GradeLevel[]>(`${this.apiUrl}/grade-levels/all`, {
      params: {
        ...page,
        ...sort,
      },
    });
  }
}
