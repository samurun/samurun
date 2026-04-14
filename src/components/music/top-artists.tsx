'use client';

import Image from 'next/image';

import { useSpotifyQuery } from '@/hooks/use-spotify-query';

interface Artist {
  name: string;
  url: string;
  coverImage: string;
  followers: number;
}

type TopArtistsResponse = {
  artists: Artist[];
  message?: string;
};

export default function TopArtists() {
  const { data, isLoading, isError } =
    useSpotifyQuery<TopArtistsResponse>('top-artists');

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  if (isError) {
    return (
      <div className='border border-border/50 rounded-xl bg-card p-6'>
        <h2 className='text-lg font-semibold tracking-tight mb-6'>
          Top Artists
        </h2>
        <p className='text-xs text-muted-foreground'>
          Unable to load artists right now.
        </p>
      </div>
    );
  }

  const artists = data?.artists ?? [];

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>
        Top Artists
      </h2>
      {artists.length === 0 ? (
        <p className='text-xs text-muted-foreground'>
          {data?.message || 'No top artists found for this account.'}
        </p>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {artists.map((artist) => (
            <a
              key={artist.url}
              href={artist.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex flex-col items-center text-center gap-3'
            >
              <div className='relative size-24 rounded-full overflow-hidden border border-border/50'>
                <Image
                  src={artist.coverImage}
                  alt={artist.name}
                  fill
                  className='object-cover'
                  sizes='96px'
                />
              </div>
              <div>
                <p className='text-xs font-semibold tracking-tight group-hover:text-primary transition-colors'>
                  {artist.name}
                </p>
                <p className='text-xs text-muted-foreground mt-1'>
                  {artist.followers.toLocaleString()} Followers
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
