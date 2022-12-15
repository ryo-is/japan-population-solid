import { createStore } from 'solid-js/store';

import { SolidApexCharts } from 'solid-apexcharts';
import { Component, createEffect } from 'solid-js';
import { ApexOptions } from 'apexcharts';
import { Population } from '@apis/fetchers';
import { Resource } from 'solid-js';

interface ChartProps {
  populations: Resource<Population[]>;
}

type SeriesItem = { name: string; data: number[] };

export const Chart: Component<ChartProps> = (props) => {
  const [options] = createStore<ApexOptions>({
    chart: {
      id: 'solidchart-example',
      animations: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
        1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
        2020, 2025, 2030, 2035, 2040, 2045,
      ],
      labels: {
        style: {
          cssClass: 'fill-zinc-200',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          cssClass: 'fill-zinc-200',
        },
      },
    },
    legend: {
      labels: {
        colors: '#e4e4e7',
      },
    },
  });
  const [series, setSeries] = createStore<{ list: SeriesItem[] }>({
    list: [
      {
        name: '',
        data: [],
      },
    ],
  });

  createEffect(() => {
    createSeries(props.populations() || []);
  });

  const createSeries = (populations: Population[]) => {
    const newSeries: SeriesItem[] = [];
    if (populations.length <= 0) {
      setSeries({
        list: newSeries,
      });
    }
    populations.forEach((p) => {
      newSeries.push({
        name: p.label,
        data: p.data.map(({ value }) => value),
      });
    });
    setSeries({
      list: newSeries,
    });
  };

  return (
    <div class="w-full p-4 mt-16 text-zinc-800">
      <SolidApexCharts
        width="100%"
        type="line"
        options={options}
        series={series.list}
      />
    </div>
  );
};
