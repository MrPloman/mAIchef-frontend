import { Component } from '@angular/core';
import { LoginComponent } from '../../shared/ui/login/login.component';
import { RegisterComponent } from '../../shared/ui/register/register.component';

@Component({
  selector: 'app-auth.component',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
