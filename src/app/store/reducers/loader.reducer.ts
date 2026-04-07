import { createReducer, on } from '@ngrx/store';
import { hideLoader, showLoader } from '../actions/loader.actions';
import { LoaderState, initialLoaderState } from '../state/loader.state';

export const loaderReducer = createReducer<LoaderState>(
  initialLoaderState,

  on(showLoader, (state) => ({
    ...state,
    isLoading: true,
    showLoader: true,
  })),

  on(hideLoader, () => {
    setTimeout(() => {
      return { isLoading: false, showLoader: false };
    }, 1000);
    return { isLoading: true, showLoader: false };
  }),
);
