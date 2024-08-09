import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "./auth/authentication.service";
import {map} from "rxjs";
import {User} from "@angular/fire/auth";

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map((response: User | null) => {
      if (!response) {
        router.navigate(['/auth']);
        return false;
      }
      return true;
    })
  );
};
