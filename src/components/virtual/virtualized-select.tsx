'use client';

import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DATA = Array.from({ length: 10000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Option ${i + 1}`,
}));

export function VirtualizedSelect() {
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState('');
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: DATA.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={select}
      onValueChange={setSelect}
    >
      <SelectTrigger className='w-70'>
        <SelectValue placeholder='Select an option'>{select}</SelectValue>
      </SelectTrigger>

      <SelectContent
        position='popper'
        className='w-(--radix-select-trigger-width) max-h-75 p-0'
      >
        <div ref={parentRef} className='max-h-75 overflow-y-auto'>
          <SelectGroup>
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <SelectItem value={DATA[virtualRow.index].value}>
                    {DATA[virtualRow.index].label}
                  </SelectItem>
                </div>
              ))}
            </div>
          </SelectGroup>
        </div>
      </SelectContent>
    </Select>
  );
}
