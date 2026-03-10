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

const DYNAMIC_DATA = Array.from({ length: 5000 }, (_, i) => ({
  value: `id-${i}`,
  label:
    i % 5 === 0
      ? `Option ${i} - นี่คือข้อความที่ยาวมากเป็นพิเศษเพื่อให้เห็นว่าความสูงของ Row จะขยับตามเนื้อหาจริงที่เกิดขึ้นในแต่ละบรรทัด`
      : `Option ${i}`,
}));
const DYNAMIC_VALUE_LABEL_MAP = new Map(
  DYNAMIC_DATA.map((item) => [item.value, item.label]),
);

export function DynamicVirtualizedSelect() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const parentRef = React.useRef<HTMLDivElement>(null);
  const scrollOffsetRef = React.useRef(0);
  const data = DYNAMIC_DATA;

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    initialOffset: scrollOffsetRef.current,
    measureElement: (el) => (el instanceof HTMLElement ? el.offsetHeight : 0),
    overscan: 5,
    onChange: (instance) => {
      scrollOffsetRef.current = instance.scrollOffset || 0;
    },
  });

  const selectedLabel = DYNAMIC_VALUE_LABEL_MAP.get(selectedValue);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={selectedValue}
      onValueChange={setSelectedValue}
    >
      <SelectTrigger className='w-87.5'>
        <SelectValue placeholder='Select an option'>
          {selectedLabel || 'เลือกรายการ...'}
        </SelectValue>
      </SelectTrigger>

      <SelectContent position='popper' className='p-0'>
        <div ref={parentRef} className='max-h-75 overflow-y-auto w-full'>
          <SelectGroup>
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = data[virtualRow.index];
                return (
                  <SelectItem
                    key={virtualRow.key}
                    value={item.value}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    ref={rowVirtualizer.measureElement}
                    data-index={virtualRow.index}
                    className='whitespace-normal'
                  >
                    {item.label}
                  </SelectItem>
                );
              })}
            </div>
          </SelectGroup>
        </div>
      </SelectContent>
    </Select>
  );
}
