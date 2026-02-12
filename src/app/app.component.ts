import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeRequest } from './core/domain/models/prompt/recipe-request.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mAIchef-frontend';
  public recipeR = RecipeRequest.create({
    prompt: 'Hola',
    preferences: undefined,
  });
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.recipeR);
  }
}
