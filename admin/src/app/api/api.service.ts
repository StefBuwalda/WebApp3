import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import {JwtUser} from '../auth/jwt-user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly config: ConfigService = inject(ConfigService);
  private readonly auth:AuthService = inject(AuthService);

  private getAuthHeaders(): HeadersInit {
    const user = this.auth.getUser();
    if (!user) throw new Error('ApiService requires an authenticated user — did you forget authGuard?');

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    };
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${this.config.apiUrl}/${path}`, {
      method,
      headers: this.getAuthHeaders(),
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.auth.logout();
        throw new Error('Unauthorized');
      }

      throw new Error(`${method} ${path} failed: ${response.status} ${response.statusText}`);
    }

    return await response.json() as Promise<T>;
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}
