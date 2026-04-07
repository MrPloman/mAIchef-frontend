import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderFacade } from '../../../store/facades/loader.facade';
@Component({
  selector: 'app-recipe-generator',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './recipe-generator.component.html',
  styleUrl: './recipe-generator.component.scss',
})
export class RecipeGeneratorComponent {
  constructor(private loaderFacade: LoaderFacade) {}
  public getReceipe() {
    this.loaderFacade.show();
    setTimeout(() => {
      this.loaderFacade.hide();
    }, 5000);
  }
}
