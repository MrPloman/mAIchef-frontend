// loader.effects.ts
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  // setSomething$ = createEffect(() => console.log('AuthEffects initialized')
  //   // this.actions$.pipe(
  //   //   ofType(''),
  //   //   map(() => {
  //   //     console.log('Animation started');
  //   //   }), // Aquí puedes iniciar tu animación CSS (si es necesario)
  //   // ),
  // );
}
