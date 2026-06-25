import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label>Username</label>
      <input type="text" formControlName="username" />
      <label>Password</label>
      <input type="password" formControlName="password" />
      @if (errorMessage()) {
        <p>{{ errorMessage() }}</p>
      }
      <button type="submit" [disabled]="!loginForm.valid || isLoading()">
        {{ isLoading() ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected errorMessage = signal('');
  protected isLoading = signal(false);

  protected loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected onSubmit(): void {
    const { username, password } = this.loginForm.getRawValue();

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      },
    });
  }
}
