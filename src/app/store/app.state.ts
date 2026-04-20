import { ActionReducerMap } from '@ngrx/store';
import { loaderReducer } from './reducers/loader.reducer';
import { recipesReducer } from './reducers/recipes.reducer';
import { LOADER_FEATURE_KEY } from './selectors/loader.selector';
import { RECIPES_FEATURE_KEY } from './selectors/recipes.selector';
import { LoaderState } from './state/loader.state';
import { RecipesState } from './state/recipes.state';

export interface AppState {
  [LOADER_FEATURE_KEY]: LoaderState;
  [RECIPES_FEATURE_KEY]: RecipesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  [LOADER_FEATURE_KEY]: loaderReducer,
  [RECIPES_FEATURE_KEY]: recipesReducer,
};
