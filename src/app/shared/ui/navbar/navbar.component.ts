import { CommonModule } from '@angular/common';
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
import { Store } from '@ngrx/store';
import { Subscription, filter, firstValueFrom } from 'rxjs';
import { selectLengthOfRecipes } from '../../../store/selectors/recipes.selector';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('navContainer') navContainer!: ElementRef<HTMLElement>;
  @ViewChild('bubble') bubbleEl!: ElementRef<HTMLElement>;
  @ViewChildren('navBtn') navBtns!: QueryList<ElementRef<HTMLElement>>;

  navItems: any[] = [
    { label: 'Home', icon: '⌂', route: '/home', enabled: true },
    { label: 'Results', icon: '◎', route: '/results', enabled: false },
    {
      label: 'Lists',
      icon: '◷',
      route: '/lists',
      enabled: false,
    },
    { label: 'Profile', icon: '👤', route: '/profile', enabled: true },
  ];

  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.getRecipesLength();
  }
  private async getRecipesLength() {
    const numberOfRecipes = await firstValueFrom(
      this.store.select(selectLengthOfRecipes),
    );
    if (numberOfRecipes > 0) {
      this.navItems[1].enabled = true;
    } else {
      this.navItems[1].enabled = false;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getRecipesLength();
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
    const btn = this.navBtns.get(index)?.nativeElement;
    if (btn) this.animateBubble(btn);
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
