'use client';

import Image from 'next/image';

import { useSpotifyQuery } from '@/hooks/use-spotify-query';
import { SpotifyIcon } from './icons';

export type Song = {
  status: number;
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

const SpotifySkeleton = () => (
  <div className='border border-border/50 p-2.5 bg-card/50 rounded-lg w-fit flex items-center gap-3 animate-pulse'>
    <div className='size-8 bg-secondary rounded-md' />
    <div className='space-y-1'>
      <div className='w-24 h-3 bg-secondary rounded' />
      <div className='w-16 h-2 bg-secondary rounded' />
    </div>
  </div>
);

const StatusIndicator = () => (
  <div className='relative flex h-2 w-2'>
    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75'></span>
    <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
  </div>
);

const NotPlaying = () => (
  <>
    <SpotifyIcon className='size-6 text-muted-foreground' />
    <p className='text-xs text-muted-foreground'>Not Playing</p>
  </>
);

export default function SpotifyPlayer() {
  const { data, isLoading } = useSpotifyQuery<{
    isPlaying: boolean;
    song: Song;
  }>('now-playing');

  if (isLoading) {
    return <SpotifySkeleton />;
  }

  return (
    <div className='group border border-border/50 p-2.5 bg-card/50 hover:bg-card transition-colors rounded-lg w-fit flex items-center gap-3'>
      {data?.isPlaying ? (
        <>
          <div className='size-8 relative rounded-md overflow-hidden'>
            <Image
              fill
              src={data.song.albumImageUrl}
              alt={data.song.title}
              className='object-cover'
              sizes='32px'
            />
          </div>
          <div className='text-start'>
            <div className='flex items-center gap-2'>
              <StatusIndicator />
              <p className='text-[11px] font-semibold tracking-tight line-clamp-1 max-w-[120px]'>
                {data.song.title}
              </p>
            </div>
            <p className='text-[10px] text-muted-foreground'>
              {data.song.artist}
            </p>
          </div>
        </>
      ) : (
        <NotPlaying />
      )}
    </div>
  );
}

export { SpotifySkeleton };
