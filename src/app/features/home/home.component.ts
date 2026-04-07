import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderComponent } from '../../shared/ui/loader/loader.component/loader.component';
import { RecipeGeneratorComponent } from '../../shared/ui/recipe-generator/recipe-generator.component';
import { LoaderFacade } from '../../store/facades/loader.facade';

@Component({
  selector: 'app-home',
  imports: [LoaderComponent, RecipeGeneratorComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public loading$ = this.loadingFacade.isLoading$;

  constructor(private loadingFacade: LoaderFacade) {}
}
