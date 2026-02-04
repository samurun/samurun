'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

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
  <div className='border border-border p-2 bg-secondary/50 rounded-none w-fit flex items-center gap-3 animate-pulse'>
    <div className='size-8 bg-border' />
    <div className='space-y-1'>
      <div className='w-24 h-3 bg-border' />
      <div className='w-16 h-2 bg-border' />
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
    <p className='text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground'>
      Not Playing
    </p>
  </>
);

export default function SpotifyPlayer() {
  const { data, isLoading } = useQuery<{ isPlaying: boolean; song: Song }>({
    queryKey: ['now-playing'],
    queryFn: () => fetch('/api/spotify/now-playing').then((res) => res.json()),
  });

  if (isLoading) {
    return <SpotifySkeleton />;
  }

  return (
    <div className='group border border-border p-2 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-none w-fit flex items-center gap-3'>
      {data?.isPlaying ? (
        <>
          <div className='size-8 relative grayscale group-hover:grayscale-0 transition-all'>
            <Image
              fill
              src={data.song.albumImageUrl}
              alt={data.song.title}
              className='object-cover'
            />
          </div>
          <div className='text-start'>
            <div className='flex items-center gap-2'>
              <StatusIndicator />
              <p className='text-[11px] font-bold tracking-tight line-clamp-1 max-w-[120px]'>
                {data.song.title}
              </p>
            </div>
            <p className='text-[9px] font-mono text-muted-foreground uppercase tracking-widest'>
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
