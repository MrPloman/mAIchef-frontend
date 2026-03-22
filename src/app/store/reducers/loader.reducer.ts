import { createReducer, on } from '@ngrx/store';
import { hideLoader, showLoader } from '../actions/loader.actions';
import { LoaderState, initialLoaderState } from '../state/loader.state';

export const loaderReducer = createReducer<LoaderState>(
  initialLoaderState,

  on(showLoader, (state, { message }) => ({
    ...state,
    isLoading: true,
    message: message ?? null,
  })),

  on(hideLoader, () => ({ ...initialLoaderState })),
);
