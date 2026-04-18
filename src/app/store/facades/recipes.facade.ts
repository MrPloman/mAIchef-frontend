import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { hideLoader, setLoader, showLoader } from '../actions/loader.actions';
import { AppState } from '../app.state';
import { selectShowLoader } from '../selectors/loader.selector';
import { selectRequestedRecipes } from '../selectors/recipes.selector';

@Injectable({ providedIn: 'root' })
export class RecipesFacade {
  readonly requestedRecipes$: Observable<Recipe[]> = this.store.select(
    selectRequestedRecipes,
  );
  readonly showLoader$: Observable<boolean> =
    this.store.select(selectShowLoader);

  constructor(private readonly store: Store<AppState>) {}

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
