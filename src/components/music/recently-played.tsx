'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { calculateDuration } from '@/lib/utils'; // Assuming this can calculate time ago, or I'll implement a simple one here.

const timeAgo = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000,
  );
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + 'y ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + 'mo ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + 'h ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + 'm ago';
  return Math.floor(seconds) + 's ago';
};

interface Track {
  artist: string;
  songUrl: string;
  title: string;
  albumImageUrl: string;
  playedAt: string;
}

export default function RecentlyPlayed() {
  const { data, isLoading } = useQuery<{ tracks: Track[] }>({
    queryKey: ['recently-played'],
    queryFn: () =>
      fetch('/api/spotify/recently-played').then((res) => res.json()),
  });

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  return (
    <div className='bg-secondary/30 border border-border p-6'>
      <h2 className='text-sm font-mono font-bold uppercase tracking-widest mb-6'>
        // Recently Played
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
            <div className='relative size-10 flex-none grayscale group-hover:grayscale-0 transition-all'>
              <Image
                src={track.albumImageUrl}
                alt={track.title}
                fill
                className='object-cover'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs font-bold truncate group-hover:text-primary transition-colors'>
                {track.title}
              </p>
              <p className='text-[10px] text-muted-foreground truncate'>
                {track.artist}
              </p>
            </div>
            <span className='text-[10px] font-mono text-muted-foreground whitespace-nowrap'>
              {timeAgo(track.playedAt)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
