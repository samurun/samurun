import { Suspense } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ElectionSeatsMap } from './components/election-seats-map/election-seats-map';
import ChartSkeleton from './components/chart-skeleton';

export default function Page() {
  const ECHART_LABS = [
    {
      title: 'Election Seats Map',
      description: 'A simple bar chart showing election seats.',
      href: '/labs/echarts/election-seats',
      comp: ElectionSeatsMap,
    },
    // {
    //   title: 'Boeing 737 900ER',
    //   description: 'Seat map of a Boeing 737 900ER.',
    //   href: '/labs/echarts/boeing-737-900er',
    // },
  ];
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold'>ECharts</h1>
        <p className='text-muted-foreground text-sm'>
          ECharts is a powerful charting library.
        </p>
      </div>
      <div>
        <ul>
          {ECHART_LABS.map((lab, index) => (
            <li key={lab.title}>
              <Card className={`${index >= 1 ? 'border-t-0' : ''}`}>
                <CardHeader>
                  <CardTitle>{lab.title}</CardTitle>
                  <CardDescription>{lab.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {lab.comp && (
                    <Suspense fallback={<ChartSkeleton />}>
                      <lab.comp />
                    </Suspense>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
