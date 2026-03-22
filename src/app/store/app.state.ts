import { ActionReducerMap } from '@ngrx/store';
import { loaderReducer } from './reducers/loader.reducer';
import { LOADER_FEATURE_KEY } from './selectors/loader.selector';
import { LoaderState } from './state/loader.state';

export interface AppState {
  [LOADER_FEATURE_KEY]: LoaderState;
}

export const appReducers: ActionReducerMap<AppState> = {
  [LOADER_FEATURE_KEY]: loaderReducer,
};
