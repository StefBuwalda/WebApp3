import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <p>HELLO TEST123</p>

    <button type="button" (click)="logout()">
      Logout
    </button>
  `,
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
