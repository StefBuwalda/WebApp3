import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly apiUrl: string = 'http://127.0.0.1:8000';
}
