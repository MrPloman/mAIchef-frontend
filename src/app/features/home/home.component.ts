import { Component } from '@angular/core';
import { LoaderComponent } from '../../shared/ui/loader/loader.component/loader.component';

@Component({
  selector: 'app-home',
  imports: [LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
