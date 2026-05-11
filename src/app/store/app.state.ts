import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducer';
import { loaderReducer } from './reducers/loader.reducer';
import { recipesReducer } from './reducers/recipes.reducer';
import { AUTH_FEATURE_KEY } from './selectors/auth.selector';
import { LOADER_FEATURE_KEY } from './selectors/loader.selector';
import { RECIPES_FEATURE_KEY } from './selectors/recipes.selector';
import { AuthState } from './state/auth.state';
import { LoaderState } from './state/loader.state';
import { RecipesState } from './state/recipes.state';

export interface AppState {
  [LOADER_FEATURE_KEY]: LoaderState;
  [RECIPES_FEATURE_KEY]: RecipesState;
  [AUTH_FEATURE_KEY]: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  [LOADER_FEATURE_KEY]: loaderReducer,
  [RECIPES_FEATURE_KEY]: recipesReducer,
  [AUTH_FEATURE_KEY]: authReducer,
};
