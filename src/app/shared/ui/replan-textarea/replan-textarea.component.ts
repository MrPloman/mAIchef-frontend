import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderFacade } from '../../../store/facades/loader.facade';

@Component({
  selector: 'app-replan-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './replan-textarea.component.html',
  styleUrl: './replan-textarea.component.scss',
})
export class ReplanTextareaComponent {
  constructor(private loadingFacade: LoaderFacade) {}
  readonly send = output<string>();

  protected message = signal('');
  protected visible = signal(true);

  protected onSend(): void {
    const text = this.message().trim();
    if (!text) return;
    this.send.emit(text);
    this.message.set('');
    this.loadingFacade.initLoadingAnimations();
    setTimeout(() => {
      this.loadingFacade.finishLoadingAnimations();
    }, 4000);
  }

  protected hide(): void {
    this.visible.set(false);
  }
}
