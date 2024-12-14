'use client';
import { useQuery } from '@tanstack/react-query';
import { SpotifyIcon } from './icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type Song = {
  status: number;
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export default function SpotifyPlayer() {
  const { data, isLoading } = useQuery<{ isPlaying: boolean; song: Song }>({
    queryKey: ['now-playing'],
    queryFn: () => fetch('/api/spotify/now-playing').then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className='border py-2 px-4 pl-2 bg-card rounded-md w-fit flex items-center gap-2 mx-auto'>
        <SpotifyIcon className='size-10' />
        <div className='space-y-1'>
          <div className='w-28 h-5 bg-border rounded' />
          <div className='w-20 h-3 bg-border rounded' />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-fit mx-auto [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-md border border-transparent overflow-hidden',
        data?.isPlaying
          ? 'animate-border'
          : '[background:linear-gradient()] border-border'
      )}
    >
      <div
        className={cn(
          'py-2 px-4 pl-2 bg-card w-fit flex items-center gap-2 mx-auto  ',
          data?.isPlaying && 'border-none'
        )}
      >
        {data?.isPlaying ? (
          <>
            <div className='size-10 aspect-square'>
              <Image
                className='rounded'
                src={data.song.albumImageUrl}
                width={40}
                height={40}
                alt={data.song.title}
              />
            </div>
            <div className='text-start'>
              <div className='flex gap-1'>
                <Image
                  src='/playing.gif'
                  width={10}
                  height={10}
                  alt='playing'
                  className='object-contain'
                />
                <p className='font-bold max-w-36 line-clamp-1'>
                  {data?.song?.title}
                </p>
              </div>
              <p className='text-xs text-muted-foreground'>
                {data.song.artist}
              </p>
            </div>
          </>
        ) : (
          <>
            <SpotifyIcon className='size-10' />
            <p className='font-bold'>Not playing</p>
          </>
        )}
      </div>
    </div>
  );
}
