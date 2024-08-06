import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly baseUrl = `${environment.apiUrl}/v1/students`;
  private readonly _http = inject(HttpClient);

  public getTotalStudents(): Observable<number> {
    return this._http.get<number>(`${this.baseUrl}/statistics/all`);
  }
}
