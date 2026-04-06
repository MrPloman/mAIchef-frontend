import { createReducer, on } from '@ngrx/store';
import { hideLoader, showLoader } from '../actions/loader.actions';
import { LoaderState, initialLoaderState } from '../state/loader.state';

export const loaderReducer = createReducer<LoaderState>(
  initialLoaderState,

  on(showLoader, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(hideLoader, () => ({ ...initialLoaderState })),
);
