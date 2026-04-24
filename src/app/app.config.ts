import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { RecipesRequestedUseCase } from './core/application/use-cases/getRecipesRequested.use-case.service';
import { RECIPES_REQUESTED_AI_PORT } from './core/ports/recipes.ports';
import { RecipeHttpAdapter } from './infrastructure/adapters/recipes.adapter';
import { HttpService } from './infrastructure/http/http.service';
import { appReducers } from './store/app.state';
import { LoaderEffects } from './store/effects/loader.effect';
import { RecipesEffects } from './store/effects/recipes.effect';

const USE_CASES = [RecipesRequestedUseCase];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appReducers),

    provideEffects([LoaderEffects, RecipesEffects]),
    provideStoreDevtools(),
    provideHttpClient(),
    HttpService,
    ...USE_CASES,

    {
      provide: RECIPES_REQUESTED_AI_PORT,
      useClass: RecipeHttpAdapter,
    },
  ],
};
