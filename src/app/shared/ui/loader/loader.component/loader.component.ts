import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { LoaderFacade } from '../../../../store/facades/loader.facade';
import { selectLoaderState } from '../../../../store/selectors/loader.selector';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  constructor(
    private loaderFacade: LoaderFacade,
    private store: Store<AppState>,
  ) {
    this.store.select(selectLoaderState).subscribe((state) => {
      if (!state.showLoader) {
        const loader = document.getElementById('loader');
        loader?.classList.remove('slide-bottom-up-element');
        loader?.classList.add('slide-middle-up-element');
      }
    });
  }

  public messages: string[] = [
    'We are working on it...',
    'This is gonna be delicious...',
    'Just a few more seconds...',
    'We are getting it.',
  ];
  public currentMessagePosition: number = 0;
  public currentMessage: WritableSignal<string> = signal(
    this.messages[this.currentMessagePosition],
  );

  ngOnInit(): void {
    this.initCycle();
  }

  public initCycle() {
    this.handleAnimationText('start');
    setTimeout(() => {
      this.handleAnimationText('end');
      setTimeout(() => {
        this.nextMessage();
        this.initCycle();
      }, 500);
    }, 3500);
  }

  public nextMessage() {
    if (this.currentMessagePosition < this.messages.length - 1) {
      this.currentMessagePosition++;
      this.currentMessage.set(this.messages[this.currentMessagePosition]);
    } else {
      this.currentMessagePosition = 0;
      this.currentMessage.set(this.messages[this.currentMessagePosition]);
    }
  }
  public handleAnimationText(mode: 'start' | 'end') {
    const message = document.getElementById('textStatus');
    if (mode === 'start') {
      message?.classList.remove('slide-middle-up-element');
      message?.classList.add('slide-bottom-up-element');
    }
    if (mode === 'end') {
      message?.classList.remove('slide-bottom-up-element');
      message?.classList.add('slide-middle-up-element');
    }
  }
}
