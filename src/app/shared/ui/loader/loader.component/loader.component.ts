import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setInterval(() => {
      this.nextMessage();
    }, 4000);
  }
  public nextMessage() {
    const message = document.getElementById('textStatus');
    message?.classList.add('slide-middle-up-element');
    setTimeout(() => {
      if (this.currentMessagePosition < this.messages.length - 1) {
        this.currentMessagePosition++;
        this.currentMessage.set(this.messages[this.currentMessagePosition]);
      } else {
        this.currentMessagePosition = 0;
        this.currentMessage.set(this.messages[this.currentMessagePosition]);
      }
    }, 500);

    console.log(this.currentMessage);
  }
}
