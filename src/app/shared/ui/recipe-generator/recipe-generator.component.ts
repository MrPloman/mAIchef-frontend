import { Component, model, ModelSignal } from '@angular/core';

@Component({
  selector: 'app-recipe-generator',
  imports: [],
  templateUrl: './recipe-generator.component.html',
  styleUrl: './recipe-generator.component.scss',
})
export class RecipeGeneratorComponent {
  public loading: ModelSignal<boolean> = model.required<boolean>();
  public setUpdate() {
    this.loading.update((s) => (s = !s));
  }
}
