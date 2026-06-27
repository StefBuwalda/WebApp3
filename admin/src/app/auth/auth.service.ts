import {map, Observable, tap} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtUser} from './jwt-user.model';
import {jwtDecode} from 'jwt-decode';
import {ConfigService} from '../config/config.service';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private config: ConfigService = inject(ConfigService);
  private router: Router = inject(Router)
  private tokenKey: string = 'auth_token';

  public login(username: string, password: string): Observable<void> {
    const url = `${this.config.apiUrl}/memory/login`;
    const body = { username, password };

    return this.http.post<{ token: string }>(url, body).pipe(
      tap(({ token }) => {
        const user = this.getUser(token);

        if (!user) {
          throw new Error('Insufficient permissions');
        }

        this.saveToken(token);
      }),
      map(() => void 0)
    );
  }

  public logout(): void {
    this.clearToken();
    this.navigateToLogin();
  }

  public isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  public getUser(token?: string): JwtUser | null {
    const actual_token = token ?? this.getToken();
    if (!actual_token) return null;

    const decoded = this.decodeToken(actual_token);
    if (!decoded) return null;

    if (!decoded.roles.includes('ROLE_ADMIN')) {
      return null;
    }

    const now = Date.now() / 1000;
    if (decoded.exp <= now) return null;

    return decoded;
  }

  private navigateToLogin(){
    this.router.navigate(['/login']);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private decodeToken(token: string): JwtUser | null {
    try {
      const decoded = jwtDecode<JwtUser>(token);

      if (
        decoded.sub === null ||
        decoded.exp === null ||
        decoded.roles === null ||
        decoded.username === null)
      {
        return null;
      }

      decoded.token = token;

      return decoded;
    } catch {
      return null;
    }
  }
}
