import { Component } from '@angular/core';
import { LoginComponent } from '../../shared/ui/login/login.component';

@Component({
  selector: 'app-auth.component',
  imports: [LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
