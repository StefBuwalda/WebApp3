import { Component, inject } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label>Username</label>
      <input type="text" formControlName="username" name="username" />
      <label>Password</label>
      <input type="password" formControlName="password" name="password" />
      <button type="submit" [disabled]="!loginForm.valid">Login</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class Login {
  private auth = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    const { username, password } = this.loginForm.getRawValue();

    this.auth.login(username, password).subscribe({
      next: (res) => {
        const token = res.token;

        // decode JWT
        const decoded = jwtDecode<any>(token);

        console.log('Decoded JWT:', decoded);

        // show fields (example)
        alert(JSON.stringify(decoded, null, 2));
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
