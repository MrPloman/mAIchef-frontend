import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { LoaderFacade } from '../../../store/facades/loader.facade';
import { RecipesFacade } from '../../../store/facades/recipes.facade';
import { navItems } from '../../constants/index';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('navContainer') navContainer!: ElementRef<HTMLElement>;
  @ViewChild('bubble') bubbleEl!: ElementRef<HTMLElement>;
  @ViewChildren('navBtn') navBtns!: QueryList<ElementRef<HTMLElement>>;

  public loading$ = this.loadingFacade.isLoading$;
  public navItems = navItems;
  private routerSub!: Subscription;
  public numberOfRecipes$ = this.recipesFacade.recipesLength$;

  constructor(
    private router: Router,
    private loadingFacade: LoaderFacade,
    private recipesFacade: RecipesFacade,
  ) {
    this.numberOfRecipes$.subscribe((length) => {
      this.navItems[1].enabled = length > 0;
    });
    // this.getRecipesLength();
  }
  // private async getRecipesLength() {
  //   const numberOfRecipes = this.recipesFacade.recipesLength$
  //     ? await firstValueFrom(this.recipesFacade.recipesLength$)
  //     : 0;
  //   console.log('Number of recipes:', numberOfRecipes);
  //   if (numberOfRecipes > 0) {
  //     this.navItems[1].enabled = true;
  //   } else {
  //     this.navItems[1].enabled = false;
  //   }
  // }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    // this.getRecipesLength();
  }

  ngAfterViewInit(): void {
    this.moveBubbleToActive();

    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.moveBubbleToActive());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  onNavClick(index: number): void {
    if (this.loading$) return;
    const btn = this.navBtns.get(index)?.nativeElement;
    if (btn) this.animateBubble(btn);
    // this.getRecipesLength();
  }

  private moveBubbleToActive(): void {
    // slight defer so RouterLinkActive classes settle

    setTimeout(() => {
      const activeBtn = this.navBtns
        .toArray()
        .find((b) => b.nativeElement.classList.contains('active'));

      if (activeBtn) this.animateBubble(activeBtn.nativeElement);
    }, 0);
  }

  private animateBubble(el: HTMLElement): void {
    const nav = this.navContainer.nativeElement;
    const bubble = this.bubbleEl.nativeElement;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    bubble.style.left = `${elRect.left - navRect.left}px`;
    bubble.style.width = `${elRect.width}px`;
  }
}
