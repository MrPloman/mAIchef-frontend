import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { RECIPES_REQUESTED_AI_PORT } from '../../core/ports/recipes.ports';
import {
  getRecipesRequested,
  getRecipesRequestedFailure,
  getRecipesRequestedSuccess,
} from '../actions/recipes.actions';
import { AppState } from '../app.state';

export class RecipesEffects {
  constructor() {}
  private aiRequestedRecipesPort = inject(RECIPES_REQUESTED_AI_PORT);
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);

  public getRecipesRequested = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipesRequested),
      switchMap(({ prompt, preferences }) =>
        this.aiRequestedRecipesPort.getRecipesRequested(prompt, preferences),
      ),
      map((response) => {
        // Process the response and dispatch a success action with the data
        return getRecipesRequestedSuccess({ recipes: response });
      }),
      catchError((error) => {
        // Handle errors and dispatch a failure action with the error message
        return of(getRecipesRequestedFailure({ error: error.message }));
      }),
    ),
  );
}
