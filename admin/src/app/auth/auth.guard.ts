import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getUser();

  if (user) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
