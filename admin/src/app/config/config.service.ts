import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly apiUrl: string = 'https://api.buwalda.it';
}
