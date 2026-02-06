'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Playlist {
  name: string;
  url: string;
  coverImage: string;
  tracks: number;
}

export default function Playlists() {
  const { data, isLoading } = useQuery<{ playlists: Playlist[] }>({
    queryKey: ['playlists'],
    queryFn: () => fetch('/api/spotify/playlists').then((res) => res.json()),
  });

  if (isLoading) {
    return <div className='animate-pulse h-64 bg-secondary/50 rounded-md' />;
  }

  return (
    <div className='bg-secondary/30 border border-border p-6'>
      <h2 className='text-sm font-mono font-bold uppercase tracking-widest mb-6'>
        // Playlists
      </h2>
      <div className='grid grid-cols-2 gap-4'>
        {data?.playlists.map((playlist, idx) => (
          <a
            key={idx}
            href={playlist.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group block'
          >
            <div className='relative aspect-square w-full mb-3 grayscale group-hover:grayscale-0 transition-all border border-border'>
              {playlist.coverImage ? (
                <Image
                  src={playlist.coverImage}
                  alt={playlist.name}
                  fill
                  className='object-cover'
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
              <p className='text-xs font-bold font-mono uppercase tracking-wider truncate group-hover:text-primary transition-colors'>
                {playlist.name}
              </p>
              <p className='text-[10px] text-muted-foreground font-mono'>
                {playlist.tracks} Tracks
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
