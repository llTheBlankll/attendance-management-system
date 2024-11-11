import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../../auth/authentication.service";
import {map} from "rxjs";
import { CodeStatus } from '../../enums/CodeStatus';
import { MessageDTO } from '../../interfaces/MessageDTO';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map((message: MessageDTO) => {
      if (message.status === CodeStatus.OK) {
        console.debug(message.message);
        return true;
      }
      console.debug(message.message);
      router.navigate(["/auth"]).then(r => console.debug(r));
      return false;
    }),
    catchError(() => {
      router.navigate(["/auth"]).then(r => console.debug(r));
      return of(false);
    })
  );
};
