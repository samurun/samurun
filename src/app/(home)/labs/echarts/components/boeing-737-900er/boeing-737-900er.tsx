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
import { useState, useMemo } from 'react';
import React from 'react';

import { Boeing737900ERSeatsSVG } from '@/assets/election-seats-svg copy';
import {
  useBoeingSeatsMapOptions,
  formatSeat,
} from '@/app/(home)/labs/hooks/boeing-seats-map-options';

echarts.use([
  TooltipComponent,
  GeoComponent,
  ToolboxComponent,
  TitleComponent,
  MapChart,
  CanvasRenderer,
]);

if (typeof window !== 'undefined') {
  echarts.registerMap('Boeing737900ERSeatsMap', {
    svg: Boeing737900ERSeatsSVG,
  });
}

export function Boeing737900ERSeatsMap() {
  const [selected, setSelected] = useState<string[]>([]);
  const option = useMemo(
    () => useBoeingSeatsMapOptions({ selected }),
    [selected],
  );

  return (
    <React.Fragment>
      <div className='flex gap-2 absolute bottom-4 left-4 right-0 z-10'>
        <div className='mx-auto'>
          {[...selected].map((seat) => formatSeat(seat)).join(', ')}
        </div>
      </div>
      <ReactECharts
        echarts={echarts}
        option={option}
        style={{ height: '600px', width: '100%' }}
        notMerge={false}
        lazyUpdate={true}
        onEvents={{
          click: (params: any) => {
            if (params.componentType !== 'geo') return;
            if (selected.includes(params.name)) {
              setSelected(selected.filter((seat) => seat !== params.name));
            } else {
              setSelected([...selected, params.name]);
            }
          },
        }}
      />
    </React.Fragment>
  );
}
