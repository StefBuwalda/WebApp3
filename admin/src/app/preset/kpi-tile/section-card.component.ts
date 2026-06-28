import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  standalone: true,
  template: `
    <div class="section">
      <p class="section-title">{{ title }}</p>
      <div class="card">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .section { margin-bottom: 1.5rem; }
    .section-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 0 0 10px;
    }
    .card {
      border: 1px solid var(--ink-muted);
      border-radius: 1rem;
      padding: 1rem 1.25rem;
    }
  `],
})
export class SectionCardComponent {
  @Input() title = '';
}
