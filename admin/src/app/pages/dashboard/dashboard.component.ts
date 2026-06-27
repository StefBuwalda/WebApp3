import { Component, OnInit, inject, signal } from '@angular/core';
import { HighchartsChartDirective } from 'highcharts-angular';
import { ApiService } from '../../api/api.service';
import { KpiCardComponent } from '../../preset/kpi-tile/kpi-card.component';
import { SectionCardComponent } from '../../preset/kpi-tile/section-card.component';
import { PlayersTableComponent } from '../../preset/kpi-tile/players-table.component';
import { GamesTableComponent } from '../../preset/kpi-tile/games-table.component';
import { Player } from '../../models/players.model';
import { Game } from '../../models/game.model';

export interface AggregateResponse {
  aantal_spellen: number;
  aantal_spelers: number;
  apis: { api: string; aantal: number }[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    HighchartsChartDirective,
    KpiCardComponent,
    SectionCardComponent,
    PlayersTableComponent,
    GamesTableComponent,
  ],
  template: `
    <div class="dashboard">

      <div class="kpi-row">
        <app-kpi-card label="Games played" [value]="aggregate()?.aantal_spellen ?? '—'" />
        <app-kpi-card label="Players" [value]="aggregate()?.aantal_spelers ?? '—'" />
        <app-kpi-card label="Active days" [value]="activeDays()" />
      </div>

      <app-section-card title="Games per day">
        @if (chartOptions()) {
          <div
            highchartsChart
            [options]="chartOptions()!"
            style="width: 100%; height: 220px; display: block;"
          ></div>
        } @else {
          <div class="placeholder">Loading...</div>
        }
      </app-section-card>

      <div class="tables-row">
        <app-section-card title="Players">
          <app-players-table [players]="players()" />
        </app-section-card>

        <app-section-card title="Games">
          <app-games-table [games]="games()" />
        </app-section-card>
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

    .tables-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

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
