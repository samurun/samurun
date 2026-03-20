import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense } from 'react';
import { AnchorTooltip } from './components/anchor-tooltip';
import { Spinner } from '@/components/ui/spinner';
import { SegmentedControl } from './components/segmented-control';

export const metadata = {
  title: 'Modern CSS',
  description: 'A collection of modern CSS techniques and experiments.',
};

const CSS_LABS = [
  {
    title: 'Anchor tooltip: display tooltips on hover',
    description:
      'Using the `anchor-name` and `position-anchor` properties to create tooltips that follow their anchor elements.',
    href: '/labs/css/anchor-tooltip',
    comp: AnchorTooltip,
  },
  {
    title: 'Segmented control: create a segmented control component',
    description:
      'Using modern CSS techniques to create a segmented control component with hover effects.',
    href: '/labs/css/segmented-control',
    comp: SegmentedControl,
  },
];

export default function Page() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold'>Modern CSS</h1>
        <p className='text-muted-foreground text-sm'>
          A collection of modern CSS techniques and experiments.
        </p>
      </div>
      <ul>
        {CSS_LABS.map((lab, index) => (
          <li key={lab.title}>
            <Card className={`${index >= 1 ? 'border-t-0' : ''}`}>
              <CardHeader>
                <CardTitle>{lab.title}</CardTitle>
                <CardDescription>{lab.description}</CardDescription>
              </CardHeader>
              <CardContent className='relative mt-4'>
                <Suspense fallback={<Spinner />}>
                  <lab.comp />
                </Suspense>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
