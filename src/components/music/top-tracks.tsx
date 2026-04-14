'use client';

import Image from 'next/image';

import { useSpotifyQuery } from '@/hooks/use-spotify-query';

interface Track {
  artist: string;
  songUrl: string;
  title: string;
  albumImageUrl: string;
  album: string;
}

type TopTracksResponse = {
  tracks: Track[];
  message?: string;
};

export default function TopTracks() {
  const { data, isLoading, isError } =
    useSpotifyQuery<TopTracksResponse>('top-tracks');

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  if (isError) {
    return (
      <div className='border border-border/50 rounded-xl bg-card p-6'>
        <h2 className='text-lg font-semibold tracking-tight mb-6'>
          Top Tracks
        </h2>
        <p className='text-xs text-muted-foreground'>
          Unable to load tracks right now.
        </p>
      </div>
    );
  }

  const tracks = data?.tracks ?? [];

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>
        Top Tracks
      </h2>
      {tracks.length === 0 ? (
        <p className='text-xs text-muted-foreground'>
          {data?.message || 'No top tracks found for this account.'}
        </p>
      ) : (
        <div className='flex flex-col gap-4'>
          {tracks.map((track, idx) => (
            <a
              key={track.songUrl}
              href={track.songUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-4 group'
            >
              <span className='text-xs text-muted-foreground w-4 text-right'>
                {idx + 1}
              </span>
              <div className='relative size-12 flex-none rounded-md overflow-hidden'>
                <Image
                  src={track.albumImageUrl}
                  alt={track.title}
                  fill
                  className='object-cover'
                  sizes='48px'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-semibold tracking-tight truncate group-hover:text-primary transition-colors'>
                  {track.title}
                </p>
                <p className='text-xs text-muted-foreground truncate'>
                  {track.artist}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
