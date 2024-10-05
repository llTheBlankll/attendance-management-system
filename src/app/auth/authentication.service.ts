import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/dto/user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  constructor() {}

  public isAuthenticated() {
    console.log("Checking if user is authenticated...");
    return true;
  }

  public getCurrentUser(): Observable<User | null> {
    return this.http.get<User | null>(`${this.apiUrl}/users/me`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
}
