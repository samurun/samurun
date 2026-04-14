'use client';

import dynamic from 'next/dynamic';

import ChartSkeleton from './chart-skeleton';

export const ElectionSeatsMap = dynamic(
  () =>
    import('./election-seats-map/election-seats-map').then(
      (m) => m.ElectionSeatsMap
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

export const Boeing737900ERSeatsMap = dynamic(
  () =>
    import('./boeing-737-900er/boeing-737-900er').then(
      (m) => m.Boeing737900ERSeatsMap
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
