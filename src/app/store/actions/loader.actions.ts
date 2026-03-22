import { createAction, props } from '@ngrx/store';

export const showLoader = createAction(
  '[Loader] Show',
  props<{ message?: string }>(),
);

export const hideLoader = createAction('[Loader] Hide');
