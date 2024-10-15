import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Strand } from '../../interfaces/dto/strand/Strand';

@Injectable({
  providedIn: 'root'
})
export class StrandService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAllStrands(): Observable<Strand[]> {
    return this.http.get<Strand[]>(`${this.apiUrl}/strands/all`);
  }
}
