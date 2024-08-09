import {inject, Injectable} from '@angular/core';
import {Auth, User, user} from "@angular/fire/auth";
import {map, of, Subscription} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly auth = inject(Auth);
  private currentUser = user(this.auth);

  constructor() { }

  public isAuthenticated() {
    // Get user
    return this.currentUser.pipe(
      map((response: User | null) => {
        // Check if user is not null
        return response;
      })
    );
  }
}
