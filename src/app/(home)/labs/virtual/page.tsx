import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicVirtualizedSelect } from '@/components/virtual/dynamic-virtualized-select';
import { VirtualizedSelect } from '@/components/virtual/virtualized-select';

export const metadata: Metadata = {
  title: 'Virtualized Select Lab',
  description:
    'Virtualized select experiments with fixed and dynamic row heights.',
};

export default function Page() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold'>Virtualized Select Lab</h1>
        <p className='text-muted-foreground text-sm'>
          Virtualized select experiments with fixed and dynamic row heights.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Virtualized Select</CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <VirtualizedSelect />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Virtualized Select</CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <DynamicVirtualizedSelect />
        </CardContent>
      </Card>
    </div>
  );
}
