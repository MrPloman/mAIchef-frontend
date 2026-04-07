import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from '../state/loader.state';

export const LOADER_FEATURE_KEY = 'loader';

export const selectLoaderState =
  createFeatureSelector<LoaderState>(LOADER_FEATURE_KEY);

export const selectIsLoading = createSelector(
  selectLoaderState,
  (state) => state.isLoading,
);
export const selectShowLoader = createSelector(
  selectLoaderState,
  (state) => state.showLoader,
);
