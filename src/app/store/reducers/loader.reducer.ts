import { createReducer, on } from '@ngrx/store';
import { hideLoader, setLoader, showLoader } from '../actions/loader.actions';
import { LoaderState, initialLoaderState } from '../state/loader.state';

export const loaderReducer = createReducer<LoaderState>(
  initialLoaderState,
  on(setLoader, (state) => ({
    ...state,
    isLoading: !state.isLoading,
  })),
  on(showLoader, (state) => ({
    ...state,
    showLoader: true,
  })),
  on(hideLoader, (state) => ({ ...state, showLoader: false })),
);
