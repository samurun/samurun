'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export function SegmentedControl() {
  // 1. ข้อมูล Items (เพิ่ม/ลด ตรงนี้ได้เลย กว้างยาวแค่ไหนก็ได้)
  const items = [
    { id: 'inbox', label: 'Inbox' },
    { id: 'draft', label: 'Draft Messages' },
    { id: 'send', label: 'Sent' },
    { id: 'archive', label: 'Archive' }, // ทดลองเพิ่ม item
  ];

  // 2. เก็บ State ว่าตัวไหนถูกเลือก (เพื่อเอาไปทำ inline style)
  const [activeId, setActiveId] = useState(items[0].id);

  // สร้างชื่อ Anchor แบบ Dynamic เช่น --anchor-inbox
  const getAnchorName = (id: string) => `--anchor-${id}`;

  // ฟังก์ชันช่วยให้ใช้ Keyboard เลื่อนปุ่ม (Optional แต่ดีมากสำหรับ A11y)
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'ArrowRight') {
      const next = items[(index + 1) % items.length];
      setActiveId(next.id);
      document.getElementById(next.id)?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = items[(index - 1 + items.length) % items.length];
      setActiveId(prev.id);
      document.getElementById(prev.id)?.focus();
    }
  };

  return (
    <div
      role='radiogroup'
      aria-label='Select a view'
      className='relative inline-flex gap-1 px-px rounded-lg bg-secondary'
      style={
        {
          '--active-anchor-name': getAnchorName(activeId),
        } as React.CSSProperties
      }
    >
      {items.map((item, index) => (
        <div key={item.id} className='relative flex items-center'>
          <input
            type='radio'
            name='nav-segmented'
            id={item.id}
            // เปลี่ยนจาก hidden เป็น sr-only เพื่อให้ Keyboard Focus ได้
            className='peer sr-only'
            checked={activeId === item.id}
            onChange={() => setActiveId(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
          <label
            htmlFor={item.id}
            className={cn(
              'h-8 text-xs flex items-center font-medium relative z-20 px-2.5 cursor-pointer whitespace-nowrap transition-colors duration-300 rounded-lg',
              'text-muted-foreground hover:text-foreground',
              'peer-checked:text-primary-foreground peer-checked:hover:text-primary-foreground',
              // แสดง Focus Ring เมื่อใช้ Keyboard Tab มาโดน
              'peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-2',
            )}
            style={
              { anchorName: getAnchorName(item.id) } as React.CSSProperties
            }
          >
            {item.label}
          </label>
        </div>
      ))}

      {/* Indicator (The Slider) */}
      <div
        aria-hidden='true'
        className={cn(
          'absolute z-10 top-1 bottom-1 rounded-lg bg-primary',
          'transition-[left,width] duration-300 ease-in-out',
          'top-px bottom-px',
          // แก้ไขการเขียน Arbitrary Values ตรงนี้
          '[position-anchor:var(--active-anchor-name)] left-[anchor(left)] w-[anchor-size(width)]',
        )}
      />
    </div>
  );
}
