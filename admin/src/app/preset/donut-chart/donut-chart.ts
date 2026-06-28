import { Component, Input, OnChanges } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [HighchartsChartComponent],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
})
export class DonutChart implements OnChanges {
  @Input() games: any[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;

  ngOnChanges() {
    if (!this.games.length) return;

    const apiCount: { [key: string]: number } = {};
    this.games.forEach(g => {
      const api = g.api || 'unknown';
      apiCount[api] = (apiCount[api] || 0) + 1;
    });

    this.chartOptions = {
      chart: {
        type: 'pie',
        style: { fontFamily: 'Segoe UI, sans-serif' },
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Api distribution',
        style: { color: '#333333' },
      },
      plotOptions: {
        pie: {
          innerSize: '50%',
          borderRadius: 12,
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%',
            style: {
              color: '#333333',
              textOutline: 'none',
            },
          },
        },
      },
      series: [{
        type: 'pie',
        name: 'Count Games',
        data: Object.entries(apiCount).map(([name, count]) => ({ name, y: count })),
      }],
    };
    this.updateFlag = true;
  }
}
