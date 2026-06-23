import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

type JwtUser = {
  sub: string;
  username: string;
  role: string;
  exp: number;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000';
  private tokenKey = 'auth_token';

  public login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/memory/login`, { username, password });
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    const decoded = this.decodeToken();

    if (!decoded) {
      return true;
    }

    if (!decoded.exp){
      return true;
    }

    const now = Date.now() / 1000;
    return decoded.exp > now;


  private decodeToken(): JwtUser | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtUser>(token);
    } catch {
      return null;
    }
  }

  public logout() {
    this.clearToken();
  }
}
