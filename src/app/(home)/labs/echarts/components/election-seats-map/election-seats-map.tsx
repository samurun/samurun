'use client';

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GeoComponent,
  ToolboxComponent,
  TitleComponent,
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import { ElectionSeatsSVG } from '@/assets/election-seats-svg';
import { useElectionSeatsMapOptions } from '../../constants/election-seats-map-options';

echarts.use([
  TooltipComponent,
  GeoComponent,
  ToolboxComponent,
  TitleComponent,
  MapChart,
  CanvasRenderer,
]);

if (typeof window !== 'undefined') {
  echarts.registerMap('ElectionSeatsMap', { svg: ElectionSeatsSVG });
}

export function ElectionSeatsMap() {
  const option = useElectionSeatsMapOptions();

  return (
    <ReactECharts
      echarts={echarts}
      option={option}
      style={{ height: '600px', width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}
