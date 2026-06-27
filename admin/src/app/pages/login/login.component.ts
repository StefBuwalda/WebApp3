import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormFieldComponent} from '../../preset/form-field/form-field.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, FormFieldComponent],
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
