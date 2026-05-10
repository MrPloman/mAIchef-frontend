import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderFacade } from '../../../store/facades/loader.facade';

@Component({
  selector: 'app-recipe-detail-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail-loader.component.html',
  styleUrl: './recipe-detail-loader.component.scss',
})
export class RecipeDetailLoaderComponent {
  constructor(private loadingFacade: LoaderFacade) {}
  public loading$ = this.loadingFacade.isLoading$;
  public showLoader$ = this.loadingFacade.showLoader$;
  readonly ingredientRows = Array(6);
  readonly stepRows = [
    { lines: 3, hasDuration: true, hasTip: true },
    { lines: 2, hasDuration: true, hasTip: false },
    { lines: 2, hasDuration: false, hasTip: false },
  ];
}
