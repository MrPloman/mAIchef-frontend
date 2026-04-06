import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { hideLoader, showLoader } from '../actions/loader.actions';
import { AppState } from '../app.state';
import { selectIsLoading } from '../selectors/loader.selector';

@Injectable({ providedIn: 'root' })
export class LoaderFacade {
  readonly isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private readonly store: Store<AppState>) {}

  show(): void {
    this.store.dispatch(showLoader());
  }

  hide(): void {
    this.store.dispatch(hideLoader());
  }
}
