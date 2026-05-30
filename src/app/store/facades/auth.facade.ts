import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setIsAuthenticated } from '../actions/auth.actions';
import { AppState } from '../app.state';
import { selectIsAuthenticated } from '../selectors/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private readonly store: Store<AppState>) {}

  readonly isAuthenticated$: Observable<boolean> = this.store.select(
    selectIsAuthenticated,
  );

  get selectedIsAuthenticated() {
    let isAuthenticated = false;
    this.isAuthenticated$
      .subscribe((auth) => {
        isAuthenticated = auth;
        return isAuthenticated;
      })
      .unsubscribe();
    return isAuthenticated;
  }

  public login() {
    this.store.dispatch(setIsAuthenticated(true));
  }
  public logout() {
    this.store.dispatch(setIsAuthenticated(false));
  }
}
