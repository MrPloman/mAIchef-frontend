import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { hideLoader, setLoader, showLoader } from '../actions/loader.actions';
import { AppState } from '../app.state';
import {
  selectIsLoading,
  selectShowLoader,
} from '../selectors/loader.selector';

@Injectable({ providedIn: 'root' })
export class LoaderFacade {
  readonly isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  readonly showLoader$: Observable<boolean> =
    this.store.select(selectShowLoader);

  constructor(private readonly store: Store<AppState>) {}

  public initLoadingAnimations() {
    this.show();
    this.set();
  }
  public finishLoadingAnimations() {
    this.hide();
    setTimeout(() => {
      this.set();
    }, 750);
  }

  set(): void {
    this.store.dispatch(setLoader());
  }

  show(): void {
    this.store.dispatch(showLoader());
  }

  hide(): void {
    this.store.dispatch(hideLoader());
  }
}
