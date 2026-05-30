import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../../store/facades/auth.facade';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authFacade = inject(AuthFacade);

  let authenticated = authFacade.selectedIsAuthenticated;
  if (!authenticated) return router.navigate(['/profile/login']);
  else return true;
};
