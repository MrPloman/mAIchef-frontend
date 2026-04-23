// loader.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { hideLoader, setLoader } from '../actions/loader.actions';
import {
  getRecipesRequestedFailure,
  getRecipesRequestedSuccess,
} from '../actions/recipes.actions';

@Injectable()
export class LoaderEffects {
  hideLoaderOnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipesRequestedSuccess, getRecipesRequestedFailure),
      map(() => hideLoader()), // Primero oculta (animación de salida)
    ),
  );

  removeLoaderAfterDelay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hideLoader),
      switchMap(() =>
        of(setLoader()).pipe(
          delay(750), // Tiempo que dura tu animación CSS
        ),
      ),
    ),
  );

  constructor(private actions$: Actions) {}
}
