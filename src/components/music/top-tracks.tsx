'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Track {
  artist: string;
  songUrl: string;
  title: string;
  albumImageUrl: string;
  album: string;
}

export default function TopTracks() {
  const { data, isLoading } = useQuery<{ tracks: Track[] }>({
    queryKey: ['top-tracks'],
    queryFn: () => fetch('/api/spotify/top-tracks').then((res) => res.json()),
  });

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  return (
    <div className='bg-secondary/30 border border-border p-6'>
      <h2 className='text-sm font-mono font-bold uppercase tracking-widest mb-6'>
        // Top Tracks
      </h2>
      <div className='flex flex-col gap-4'>
        {data?.tracks.map((track, idx) => (
          <a
            key={idx}
            href={track.songUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-4 group'
          >
            <span className='font-mono text-muted-foreground w-4 text-right'>
              {idx + 1}
            </span>
            <div className='relative size-12 flex-none grayscale group-hover:grayscale-0 transition-all'>
              <Image
                src={track.albumImageUrl}
                alt={track.title}
                fill
                className='object-cover'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-bold truncate group-hover:text-primary transition-colors'>
                {track.title}
              </p>
              <p className='text-xs text-muted-foreground truncate'>
                {track.artist}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
