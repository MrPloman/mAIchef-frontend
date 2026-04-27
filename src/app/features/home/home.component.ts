import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoaderComponent } from '../../shared/ui/loader/loader.component/loader.component';
import { RecipeGeneratorComponent } from '../../shared/ui/recipe-generator/recipe-generator.component';
import { LoaderFacade } from '../../store/facades/loader.facade';
import { selectRequestedRecipes } from '../../store/selectors/recipes.selector';

@Component({
  selector: 'app-home',
  imports: [LoaderComponent, RecipeGeneratorComponent, AsyncPipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public loading$ = this.loadingFacade.isLoading$;
  public showLoader$ = this.loadingFacade.showLoader$;
  public dissapearNow: boolean = false;

  private recipes$ = this.store.select(selectRequestedRecipes);
  constructor(
    private loadingFacade: LoaderFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store,
  ) {
    this.cdr.markForCheck();
  }
}
