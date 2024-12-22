import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageRequest} from '../../types/other/PageRequest';
import {SortRequest} from '../../types/other/SortRequest';
import {GradeLevel} from '../../types/dto/grade-level/GradeLevel';
import {environment} from '../../../../environments/environment';

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
