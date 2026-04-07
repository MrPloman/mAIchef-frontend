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
  public showLoader$ = this.loadingFacade.showLoader$;

  constructor(private loadingFacade: LoaderFacade) {
    const loader = document.getElementById('loader');
    this.showLoader$.subscribe((show) => {
      if (loader) {
        if (show) {
          loader.classList.add('slide-middle-up-element');
        } else {
          loader.classList.remove('slide-middle-up-element');
        }
      }
    });
  }
}
