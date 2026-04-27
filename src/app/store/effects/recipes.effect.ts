import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, delay, map, of, switchMap, tap } from 'rxjs';
import { RECIPES_REQUESTED_AI_PORT } from '../../core/ports/recipes.ports';
import { RecipesHelperService } from '../../shared/utils/recipes.helper';
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
  private router = inject(Router);
  private parseRecipeResponseToModel =
    inject(RecipesHelperService).parseRecipeResponseToModel;

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
        console.log(error);
        // Handle errors and dispatch a failure action with the error message
        return of(getRecipesRequestedFailure({ error: error.message }));
      }),
    ),
  );

  // Efecto separado que reacciona al éxito y navega
  navigateAfterLoad$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getRecipesRequestedSuccess),
        delay(750), // Pequeña demora para mostrar el resultado antes de navegar
        tap(() => this.router.navigate(['/results'])),
      ),
    { dispatch: false }, // No despacha ninguna acción
  );
}
