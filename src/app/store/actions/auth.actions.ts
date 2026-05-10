import { createAction } from '@ngrx/store';

export const setIsAuthenticated = createAction(
  '[Auth] Set Is Authenticated',
  (isAuthenticated: boolean) => ({ isAuthenticated }),
);
