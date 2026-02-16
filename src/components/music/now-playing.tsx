'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { SpotifyIcon } from '../icons';
import { Equalizer } from './equalizer';

export type Song = {
  status: number;
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

// StatusIndicator removed in favor of Equalizer

export default function NowPlaying() {
  const { data, isLoading } = useQuery<{ isPlaying: boolean; song: Song }>({
    queryKey: ['now-playing-large'],
    queryFn: () => fetch('/api/spotify/now-playing').then((res) => res.json()),
  });

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  return (
    <div className='bg-secondary/30 border border-border p-6'>
      <h2 className='text-sm font-mono font-bold uppercase tracking-widest mb-6'>
        // Now Playing
      </h2>

      {data?.isPlaying ? (
        <div className='flex flex-col gap-4'>
          <div className='relative aspect-square w-full grayscale group-hover:grayscale-0 transition-all border border-border'>
            <Image
              src={data.song.albumImageUrl}
              alt={data.song.title}
              fill
              className='object-cover'
            />
          </div>

          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <a
                href={data.song.songUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg font-bold hover:text-primary transition-colors truncate'
              >
                {data.song.title}
              </a>
              <Equalizer />
            </div>
            <p className='text-sm text-muted-foreground font-mono truncate'>
              {data.song.artist}
            </p>
            <p className='text-xs text-muted-foreground/60 font-mono truncate'>
              {data.song.album}
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-48 gap-4 text-muted-foreground'>
          <SpotifyIcon className='size-12 opacity-50' />
          <p className='text-xs font-mono uppercase tracking-widest'>
            Not Playing
          </p>
        </div>
      )}
    </div>
  );
}
