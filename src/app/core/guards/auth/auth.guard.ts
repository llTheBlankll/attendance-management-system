import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from '../../../auth/authentication.service';
import {map, of} from 'rxjs';
import {CodeStatus} from '../../types/enums/CodeStatus';
import {MessageDTO} from '../../types/other/MessageDTO';
import {catchError} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map((message: MessageDTO) => {
      if (message.status === CodeStatus.OK) {
        return true;
      }
      router.navigate(['/auth']).then((r) => console.debug(r));
      return false;
    }),
    catchError(() => {
      router.navigate(['/auth']).then((r) => console.debug(r));
      return of(false);
    })
  );
};
