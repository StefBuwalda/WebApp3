import {map, Observable, tap} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtUser} from './jwt-user.model';
import {jwtDecode} from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000';
  private tokenKey = 'auth_token';

  public login(username: string, password: string): Observable<void> {
    const url = `${this.apiUrl}/memory/login`;
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

      return decoded;
    } catch {
      return null;
    }
  }
}
