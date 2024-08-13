import {inject, Injectable} from '@angular/core';
import {Auth, User, user} from "@angular/fire/auth";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly auth = inject(Auth);
  private currentUser = user(this.auth);

  constructor() {
  }

  public isAuthenticated() {
    // Get user
    return this.currentUser.pipe(
      map((user: User | null) => {
        if (user === null) {
          console.error("User is null");
          return null;
        }

        // TODO: Get the custom claims
        user.getIdTokenResult().then((token) => {
          if (token.claims["role"] === "ADMIN") {
            sessionStorage.setItem("role", "ADMIN");
          } else if (token.claims["role"] === "TEACHER") {
            sessionStorage.setItem("role", "TEACHER");
          } else {
            // Guest
            token.claims["role"] = "GUEST";
            sessionStorage.setItem("role", "GUEST");
          }
        })

        // Check if user is not null
        return user;
      })
    );
  }
}
