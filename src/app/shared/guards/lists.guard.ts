// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../../store/facades/auth.facade';

export const listsPageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authFacade = inject(AuthFacade);
  let isAuthenticated: boolean = false;
  authFacade.isAuthenticated$.subscribe((authStatus) => {
    isAuthenticated = authStatus;
  });

  return isAuthenticated ? true : router.navigate(['/home']);
};
