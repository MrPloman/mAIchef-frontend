import { Component } from '@angular/core';
import { LoaderFacade } from '../../../store/facades/loader.facade';

@Component({
  selector: 'app-recipe-generator',
  imports: [],
  templateUrl: './recipe-generator.component.html',
  styleUrl: './recipe-generator.component.scss',
})
export class RecipeGeneratorComponent {
  constructor(private loaderFacade: LoaderFacade) {}
  // public loading: ModelSignal<boolean> = model.required<boolean>();
  public getReceipe() {
    this.loaderFacade.show();
  }
}
