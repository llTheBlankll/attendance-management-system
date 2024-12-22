import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Login} from '../core/types/dto/forms/Login';
import {User} from '../core/types/dto/user/user';
import {JWTInformation} from '../core/types/other/JWTInformation';
import {MessageDTO} from '../core/types/other/MessageDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  constructor() {
  }

  public login(login: Login) {
    return this.http
      .post<JWTInformation>(`${this.apiUrl}/users/login`, login, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  }

  public isAuthenticatedAsync() {
    return this.http.get<MessageDTO>(`${this.apiUrl}/users/validate`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    });
  }

  public getCurrentUserAsync(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }

  public getUserToken() {
    return localStorage.getItem("token");
  }

  public getUserRole() {
    return localStorage.getItem("role");
  }

  public getUserJWT() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      return JSON.parse(jwt) as JWTInformation;
    }

    return null;
  }
}
