import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setIsAuthenticated } from '../actions/auth.actions';
import { AppState } from '../app.state';
import { selectIsAuthenticated } from '../selectors/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  readonly isAuthenticated$: Observable<boolean> = this.store.select(
    selectIsAuthenticated,
  );

  constructor(private readonly store: Store<AppState>) {}

  public login() {
    this.store.dispatch(setIsAuthenticated(true));
  }
  public logout() {
    this.store.dispatch(setIsAuthenticated(false));
  }
}
