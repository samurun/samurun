'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

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
  const { data, isLoading, isError } = useQuery<TopArtistsResponse>({
    queryKey: ['top-artists'],
    queryFn: () => fetch('/api/spotify/top-artists').then((res) => res.json()),
  });

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  if (isError) {
    return (
      <div className='bg-secondary/30 border border-border p-6'>
        <h2 className='text-sm font-mono font-bold uppercase tracking-widest mb-6'>
          {'// Top Artists'}
        </h2>
        <p className='text-xs text-muted-foreground font-mono'>
          Unable to load artists right now.
        </p>
      </div>
    );
  }

  const artists = data?.artists ?? [];

  return (
    <div className='bg-secondary/30 border border-border p-6'>
      <h2 className='text-sm font-mono font-bold uppercase tracking-widest mb-6'>
        {'// Top Artists'}
      </h2>
      {artists.length === 0 ? (
        <p className='text-xs text-muted-foreground font-mono'>
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
              <div className='relative size-24 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-border'>
                <Image
                  src={artist.coverImage}
                  alt={artist.name}
                  fill
                  className='object-cover'
                  sizes='96px'
                />
              </div>
              <div>
                <p className='text-xs font-bold group-hover:text-primary transition-colors'>
                  {artist.name}
                </p>
                <p className='text-[10px] text-muted-foreground font-mono mt-1'>
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
