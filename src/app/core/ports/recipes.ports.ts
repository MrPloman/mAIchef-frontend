import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../domain/models/recipe/recipe.model';
import { RecipePreferences } from '../domain/value-objects/recipe-preferences.vo';
// import { languageType } from '@app/core/types/index.types';
// import { Chord } from '../models/chord.model';
// export interface AiResponse {
//   chords: Chord[];
//   clarification: string;
//   response?: string;
// }
export interface RecipesRequestedAIPort {
  getRecipesRequested(
    prompt: string,
    preferences: RecipePreferences,
  ): Observable<Recipe[]>;
  //   getAlternativeChords(chord: Chord): Promise<AiResponse>;
  //   getHandbookChords(chordName: string): Promise<AiResponse>;
  //   getProgression(
  //     chords: Chord[],
  //     prompt: string,
  //     language: languageType,
  //   ): Promise<AiResponse>;
}
export const RECIPES_REQUESTED_AI_PORT =
  new InjectionToken<RecipesRequestedAIPort>('RECIPES_REQUESTED_AI_PORT');
