'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface SegmentedControlItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SegmentedControlProps {
  value?: string;
  onChange?: (value: string) => void;
  items: SegmentedControlItem[];
}

export function SegmentedControl({
  items,
  value,
  onChange,
}: SegmentedControlProps) {
  const [activeValue, setActiveValue] = useState(value ?? items[0].value);
  const inputRefs = React.useRef<Map<string, HTMLInputElement>>(new Map());
  const getAnchorName = (value: string) => `--anchor-${value}`;

  const setInputRef = (value: string) => (el: HTMLInputElement | null) => {
    if (el) {
      inputRefs.current.set(value, el);
    } else {
      inputRefs.current.delete(value);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    let nextItem: SegmentedControlItem | undefined;
    if (e.key === 'ArrowRight') {
      nextItem = items[(index + 1) % items.length];
    } else if (e.key === 'ArrowLeft') {
      nextItem = items[(index - 1 + items.length) % items.length];
    }
    if (nextItem) {
      setActiveValue(nextItem.value);
      onChange?.(nextItem.value);
      inputRefs.current.get(nextItem.value)?.focus();
    }
  };

  return (
    <div
      role='radiogroup'
      aria-label='Select a view'
      className='relative inline-flex gap-1 px-px rounded-lg bg-secondary'
      style={
        {
          '--active-anchor-name': getAnchorName(activeValue),
        } as React.CSSProperties
      }
    >
      {items.map((item, index) => (
        <div key={item.value} className='relative flex items-center'>
          <input
            type='radio'
            name='nav-segmented'
            id={item.value}
            ref={setInputRef(item.value)}
            className='peer sr-only'
            disabled={item.disabled}
            checked={activeValue === item.value}
            onChange={() => {
              setActiveValue(item.value);
              onChange?.(item.value);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
          <label
            htmlFor={item.value}
            className={cn(
              'h-8 text-xs flex items-center font-medium relative z-20 px-2.5 cursor-pointer whitespace-nowrap transition-colors duration-300 rounded-lg',
              'text-muted-foreground hover:text-foreground',
              'peer-checked:text-primary-foreground peer-checked:hover:text-primary-foreground',
              'peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-2',
              item.disabled && 'cursor-not-allowed opacity-50',
            )}
            style={
              { anchorName: getAnchorName(item.value) } as React.CSSProperties
            }
          >
            {item.label}
          </label>
        </div>
      ))}

      <div
        aria-hidden='true'
        className={cn(
          'absolute z-10 top-1 bottom-1 rounded-lg bg-primary',
          'transition-[left,width] duration-300 ease-in-out',
          'top-px bottom-px',
          '[position-anchor:var(--active-anchor-name)] left-[anchor(left)] w-[anchor-size(width)]',
        )}
      />
    </div>
  );
}
