import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/dto/user/user';
import {JWTInformation} from "../interfaces/JWTInformation";
import {MessageDTO} from '../interfaces/MessageDTO';
import {Login} from "../interfaces/dto/forms/Login";
import {CodeStatus} from "../enums/CodeStatus";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  constructor() {
  }

  public login(login: Login) {
    console.log("Logging in...");
    return this.http
      .post<JWTInformation>(`${this.apiUrl}/users/login`, login, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  }

  public isAuthenticated(): Observable<MessageDTO> {
    console.log("Checking if user is authenticated...");
    return this.http.get<MessageDTO>(`${this.apiUrl}/users/validate`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    });
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
}
