import { createStore } from 'solid-js/store';

import { SolidApexCharts } from 'solid-apexcharts';
import { Component } from 'solid-js';
import { ApexOptions } from 'apexcharts';

export const Chart: Component = () => {
  const [options] = createStore<ApexOptions>({
    chart: {
      id: 'solidchart-example',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
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
  });
  const [series] = createStore({
    list: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
    ],
  });

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
