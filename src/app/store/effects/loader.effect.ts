// loader.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { hideLoader, setLoader, showLoader } from '../actions/loader.actions';
import {
  getRecipesRequested,
  getRecipesRequestedFailure,
  getRecipesRequestedSuccess,
} from '../actions/recipes.actions';

@Injectable()
export class LoaderEffects {
  setAnimationOnRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipesRequested),
      map(() => showLoader()), // Aquí puedes iniciar tu animación CSS (si es necesario)
    ),
  );
  setLoaderOnRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showLoader),
      map(() => setLoader()), // Muestra el loader inmediatamente
    ),
  );

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
