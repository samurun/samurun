'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Playlist {
  name: string;
  url: string;
  coverImage: string;
  tracks: number;
}

type PlaylistsResponse = {
  playlists: Playlist[];
  message?: string;
};

export default function Playlists() {
  const { data, isLoading, isError } = useQuery<PlaylistsResponse>({
    queryKey: ['playlists'],
    queryFn: () => fetch('/api/spotify/playlists').then((res) => res.json()),
  });

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  if (isError) {
    return (
      <div className='border border-border/50 rounded-xl bg-card p-6'>
        <h2 className='text-lg font-semibold tracking-tight mb-6'>
          Playlists
        </h2>
        <p className='text-xs text-muted-foreground'>
          Unable to load playlists right now.
        </p>
      </div>
    );
  }

  const playlists = data?.playlists ?? [];

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>
        Playlists
      </h2>
      {playlists.length === 0 ? (
        <p className='text-xs text-muted-foreground'>
          {data?.message || 'No playlists found for this account.'}
        </p>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {playlists.map((playlist) => (
            <a
              key={playlist.url}
              href={playlist.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group block'
            >
              <div className='relative aspect-square w-full mb-3 rounded-md overflow-hidden border border-border/50'>
                {playlist.coverImage ? (
                  <Image
                    src={playlist.coverImage}
                    alt={playlist.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  />
                ) : (
                  <div className='w-full h-full bg-secondary flex items-center justify-center'>
                    <span className='text-xs text-muted-foreground'>
                      No Cover
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className='text-xs font-semibold tracking-tight truncate group-hover:text-primary transition-colors'>
                  {playlist.name}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {playlist.tracks} Tracks
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
