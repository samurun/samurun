'use client';

import { useQuery } from '@tanstack/react-query';
import { PercentIcon } from 'lucide-react';
import Link from 'next/link';

import { Song } from './music/now-playing';
import { Equalizer } from './music/equalizer';
import ModeToggle from './mode-toggle';

const NAV_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Labs', href: '/labs' },
  { label: 'Hiking', href: '/hiking' },
  { label: 'Music', href: '/music' },
];

export default function Header() {
  const { data } = useQuery<{ isPlaying: boolean; song: Song }>({
    queryKey: ['now-playing-large'],
    queryFn: () => fetch('/api/spotify/now-playing').then((res) => res.json()),
    refetchInterval: 10000,
  });

  return (
    <header className='sticky top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/50'>
      <div className='container h-14 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <Link
            href={'/'}
            className='size-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors'
          >
            <PercentIcon className='size-4' />
          </Link>
          <nav className='flex items-center gap-1'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50'
              >
                {item.label === 'Music' && data?.isPlaying ? (
                  <span className='flex items-center gap-2'>
                    <Equalizer />
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            ))}
          </nav>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
