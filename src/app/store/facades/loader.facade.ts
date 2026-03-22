import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { hideLoader, showLoader } from '../actions/loader.actions';
import { AppState } from '../app.state';
import {
  selectIsLoading,
  selectLoaderMessage,
} from '../selectors/loader.selector';

@Injectable({ providedIn: 'root' })
export class LoaderFacade {
  readonly isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  readonly message$: Observable<string | null> =
    this.store.select(selectLoaderMessage);

  constructor(private readonly store: Store<AppState>) {}

  show(message?: string): void {
    this.store.dispatch(showLoader({ message }));
  }

  hide(): void {
    this.store.dispatch(hideLoader());
  }
}
