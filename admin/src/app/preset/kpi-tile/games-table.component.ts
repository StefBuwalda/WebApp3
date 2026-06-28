import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games-table',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <table>
      <thead>
      <tr><th>Date</th><th class="right">Score</th></tr>
      </thead>
      <tbody>
        @for (game of games; track game.day) {
          <tr>
            <td>{{ game.day }}</td>
            <td class="right tabular">{{ (game.score * -1) | number }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [`
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th {
      text-align: left;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--accent);
      padding: 0 0 8px;
      border-bottom: 1px solid var(--ink-muted);
    }
    td {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--ink-muted);
    }
    tr:last-child td { border-bottom: none; }
    .right { text-align: right; }
    .tabular { font-variant-numeric: tabular-nums; }
  `],
})
export class GamesTableComponent {
  @Input() games: Game[] = [];
}
