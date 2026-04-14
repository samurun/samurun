'use client';

import Image from 'next/image';

import { useSpotifyQuery } from '@/hooks/use-spotify-query';
import { SpotifyIcon } from '../icons';

export type Song = {
  status: number;
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

const StatusIndicator = () => (
  <div className='relative flex h-3 w-3'>
    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75'></span>
    <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
  </div>
);

export default function NowPlaying() {
  const { data, isLoading } = useSpotifyQuery<{
    isPlaying: boolean;
    song: Song;
  }>('now-playing');

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>
        Now Playing
      </h2>

      {data?.isPlaying ? (
        <div className='flex flex-col gap-4'>
          <div className='relative aspect-square w-full rounded-md overflow-hidden border border-border/50'>
            <Image
              src={data.song.albumImageUrl}
              alt={data.song.title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 33vw'
            />
          </div>

          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <a
                href={data.song.songUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg font-semibold tracking-tight hover:text-primary transition-colors truncate'
              >
                {data.song.title}
              </a>
              <StatusIndicator />
            </div>
            <p className='text-sm text-muted-foreground truncate'>
              {data.song.artist}
            </p>
            <p className='text-xs text-muted-foreground/60 truncate'>
              {data.song.album}
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-48 gap-4 text-muted-foreground'>
          <SpotifyIcon className='size-12 opacity-50' />
          <p className='text-xs text-muted-foreground'>
            Not Playing
          </p>
        </div>
      )}
    </div>
  );
}
