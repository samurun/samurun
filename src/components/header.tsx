'use client';

import { PercentIcon } from 'lucide-react';
import Link from 'next/link';

import { type Song, useSpotifyQuery } from '@/hooks/use-spotify-query';
import { Equalizer } from './music/equalizer';
import ModeToggle from './mode-toggle';

export default function Header() {
  const { data } = useSpotifyQuery<{ isPlaying: boolean; song: Song }>(
    'now-playing',
    { refetchInterval: 30_000, refetchIntervalInBackground: false }
  );

  return (
    <header className='sticky top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/50'>
      <div className='container h-14 flex items-center justify-between'>
        <Link
          href={'/'}
          className='size-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors'
        >
          <PercentIcon className='size-4' />
        </Link>
        <div className='flex items-center gap-3'>
          {data?.isPlaying && (
            <a
              href={data.song.songUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex max-w-48 items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <Equalizer />
              <span className='truncate'>{data.song.title}</span>
            </a>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
