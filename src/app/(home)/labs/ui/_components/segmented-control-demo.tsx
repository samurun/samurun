'use client';

import React from 'react';
import { SegmentedControl } from '@/components/custom-ui/segmented-control';

export function SegmentedControlDemo() {
  const [activeValue, setActiveValue] = React.useState('inbox');
  const items = [
    { label: 'Inbox', value: 'inbox' },
    { label: 'Sent', value: 'sent' },
    { label: 'Drafts', value: 'drafts' },
    {
      label: 'Spam',
      value: 'spam',
      disabled: true,
    },
  ];
  return (
    <SegmentedControl
      items={items}
      value={activeValue}
      onChange={setActiveValue}
    />
  );
}
