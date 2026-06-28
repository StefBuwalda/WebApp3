import { Component, Input } from '@angular/core';
import { Player } from '../../models/players.model';

@Component({
  selector: 'app-players-table',
  standalone: true,
  template: `
    <table>
      <thead>
      <tr><th>Username</th><th>Email</th></tr>
      </thead>
      <tbody>
        @for (player of players; track player.username) {
          <tr>
            <td>{{ player.username }}</td>
            <td class="muted">{{ player.email }}</td>
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
    .muted { color: var(--accent); }
  `],
})
export class PlayersTableComponent {
  @Input() players: Player[] = [];
}
