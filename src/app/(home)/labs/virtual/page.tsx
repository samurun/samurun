import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DynamicVirtualizedSelect } from '@/components/virtual/dynamic-virtualized-select';
import { VirtualizedSelect } from '@/components/virtual/virtualized-select';

export const metadata: Metadata = {
  title: 'Virtualized Select Lab',
  description: 'Virtualized select experiments with fixed and dynamic row heights.',
};

export default function Page() {
  // The scrollable element for your list

  return (
    <div>
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
