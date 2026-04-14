'use client';

import Image from 'next/image';

import { useSpotifyQuery } from '@/hooks/use-spotify-query';

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
  const { data, isLoading } = useSpotifyQuery<{ tracks: Track[] }>(
    'recently-played'
  );

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>
        Recently Played
      </h2>
      <div className='flex flex-col gap-4'>
        {data?.tracks.map((track) => (
          <a
            key={`${track.songUrl}-${track.playedAt}`}
            href={track.songUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-4 group'
          >
            <div className='relative size-10 flex-none rounded-md overflow-hidden'>
              <Image
                src={track.albumImageUrl}
                alt={track.title}
                fill
                className='object-cover'
                sizes='40px'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs font-semibold tracking-tight truncate group-hover:text-primary transition-colors'>
                {track.title}
              </p>
              <p className='text-[10px] text-muted-foreground truncate'>
                {track.artist}
              </p>
            </div>
            <span className='text-xs text-muted-foreground whitespace-nowrap'>
              {timeAgo(track.playedAt)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
