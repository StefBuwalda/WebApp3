import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  template: `
    <div class="kpi">
      <p class="kpi-label">{{ label }}</p>
      <p class="kpi-value">{{ value }}</p>
    </div>
  `,
  styles: [`
    .kpi {
      background: var(--card);
      border-radius: 0.5rem;
      padding: 1rem;
    }

    .kpi-label {
      font-size: 1rem;
      color: var(--ink);
      margin: 0 0 4px;
    }

    .kpi-value {
      font-size: 2rem;
      color: var(--ink);
      font-weight: 500;
      margin: 0;
    }
  `],
})
export class KpiCardComponent {
  @Input() label = '';
  @Input() value: string | number = '—';
}
