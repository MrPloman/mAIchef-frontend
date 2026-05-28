import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

// Custom validator: passwords must match
function passwordMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const pwd = control.get('password');
  const conf = control.get('confirmPassword');
  if (!pwd || !conf) return null;
  return pwd.value !== conf.value ? { passwordMismatch: true } : null;
}

// Password strength score helper
function calcStrength(pwd: string): number {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score; // 0-4
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  isLoading = signal(false);
  showPwd = signal(false);
  showConf = signal(false);

  form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator },
  );

  get name() {
    return this.form.get('name')!;
  }
  get email() {
    return this.form.get('email')!;
  }
  get password() {
    return this.form.get('password')!;
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }
  get terms() {
    return this.form.get('terms')!;
  }

  get strengthScore() {
    return calcStrength(this.password.value ?? '');
  }
  get strengthLabel() {
    return ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][this.strengthScore];
  }
  get strengthClass() {
    return ['', 'weak', 'fair', 'good', 'strong'][this.strengthScore];
  }
  get strengthBars() {
    return [1, 2, 3, 4];
  }

  barClass(bar: number): string {
    if (bar > this.strengthScore) return '';
    return ['', 'active-weak', 'active-fair', 'active-good', 'active-strong'][
      this.strengthScore
    ];
  }

  togglePwd() {
    this.showPwd.update((v) => !v);
  }
  toggleConf() {
    this.showConf.update((v) => !v);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    // TODO: inject AuthService → authService.register(this.form.value)
    setTimeout(() => this.isLoading.set(false), 1500);
  }
}
