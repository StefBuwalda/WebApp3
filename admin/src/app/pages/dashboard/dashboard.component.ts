import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HighchartsChartDirective } from 'highcharts-angular';
import { ApiService } from '../../api.service';

interface AggregateResponse {
  aantal_spellen: number;
  aantal_spelers: number;
  apis: { api: string; aantal: number }[];
}

interface Player {
  username: string;
  email: string;
}

interface Game {
  day: string;
  score: number;
  api: string;
  color_closed: string;
  color_found: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DecimalPipe, HighchartsChartDirective],
  template: `
    <div class="dashboard">

      <div class="kpi-row">
        <div class="kpi">
          <p class="kpi-label">Games played</p>
          <p class="kpi-value">{{ aggregate()?.aantal_spellen ?? '—' }}</p>
        </div>
        <div class="kpi">
          <p class="kpi-label">Players</p>
          <p class="kpi-value">{{ aggregate()?.aantal_spelers ?? '—' }}</p>
        </div>
        <div class="kpi">
          <p class="kpi-label">Active days</p>
          <p class="kpi-value">{{ activeDays() }}</p>
        </div>
      </div>

      <div class="section">
        <p class="section-title">Games per day</p>
        <div class="card">
          @if (chartOptions()) {
            <div
              highchartsChart
              [options]="chartOptions()!"
              style="width: 100%; height: 220px; display: block;"
            ></div>
          } @else {
            <div class="placeholder">Loading...</div>
          }
        </div>
      </div>

      <div class="tables-row">
        <div class="section">
          <p class="section-title">Players</p>
          <div class="card">
            <table>
              <thead>
              <tr><th>Username</th><th>Email</th></tr>
              </thead>
              <tbody>
                @for (player of players(); track player.username) {
                  <tr>
                    <td>{{ player.username }}</td>
                    <td class="muted">{{ player.email }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <div class="section">
          <p class="section-title">Games</p>
          <div class="card">
            <table>
              <thead>
              <tr><th>Date</th><th class="right">Score</th></tr>
              </thead>
              <tbody>
                @for (game of games(); track game.day) {
                  <tr>
                    <td>{{ game.day }}</td>
                    <td class="right tabular">{{ (game.score * -1) | number }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .dashboard { padding: 1.5rem 0; }

    .kpi-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 1.5rem;
    }
    .kpi {
      background: var(--surface-1, #f5f5f5);
      border-radius: 8px;
      padding: 1rem;
    }
    .kpi-label { font-size: 13px; color: #888; margin: 0 0 4px; }
    .kpi-value { font-size: 28px; font-weight: 500; margin: 0; }

    .section { margin-bottom: 1.5rem; }
    .section-title {
      font-size: 12px;
      font-weight: 500;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 0 0 10px;
    }

    .card {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1rem 1.25rem;
    }

    .tables-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th {
      text-align: left;
      font-size: 12px;
      font-weight: 500;
      color: #888;
      padding: 0 0 8px;
      border-bottom: 1px solid #e5e7eb;
    }
    td {
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    tr:last-child td { border-bottom: none; }

    .muted { color: #888; }
    .right { text-align: right; }
    .tabular { font-variant-numeric: tabular-nums; }

    .placeholder {
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #888;
    }
  `],
})
export class DashboardComponent implements OnInit {
  private readonly api = inject(ApiService);

  protected readonly aggregate = signal<AggregateResponse | null>(null);
  protected readonly players = signal<Player[]>([]);
  protected readonly games = signal<Game[]>([]);
  protected readonly chartOptions = signal<Highcharts.Options | null>(null);

  private dates: Record<string, number> = {};

  protected activeDays(): number {
    return Object.keys(this.dates).length;
  }

  async ngOnInit(): Promise<void> {
    const [rawAggregate, players, dates, games] = await Promise.all([
      this.api.get<[{ aantal_spellen: number }, { aantal_spelers: number }, { api: string; aantal: number }[]]>('admin/aggregate'),
      this.api.get<Player[]>('admin/players'),
      this.api.get<Record<string, number>>('admin/dates'),
      this.api.get<Game[]>('admin/games'),
    ]);

    this.aggregate.set({
      aantal_spellen: rawAggregate[0].aantal_spellen,
      aantal_spelers: rawAggregate[1].aantal_spelers,
      apis: rawAggregate[2],
    });

    this.dates = dates;
    this.players.set(players);
    this.games.set(games);
    this.chartOptions.set(this.buildChart(dates));
  }

  private buildChart(dates: Record<string, number>): Highcharts.Options {
    const labels = Object.keys(dates).sort();
    const values = labels.map(d => dates[d]);

    return {
      chart: { type: 'line', animation: true },
      title: { text: undefined },
      xAxis: {
        categories: labels,
        tickmarkPlacement: 'on',
      },
      yAxis: {
        title: { text: undefined },
        min: 0,
        allowDecimals: false,
      },
      series: [{
        type: 'line',
        name: 'Games',
        data: values,
        color: '#2a78d6',
        marker: { enabled: true, radius: 4 },
      }],
      legend: { enabled: false },
      credits: { enabled: false },
      tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: 'Games: {point.y}',
      },
    };
  }
}
