import { createReducer, on } from '@ngrx/store';
import { setIsAuthenticated } from '../actions/auth.actions';
import { AuthState, initialAuthState } from '../state/auth.state';

export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(setIsAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated: isAuthenticated,
  })),
);
