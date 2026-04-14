import Image from 'next/image';

import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyPaginated, SpotifyPlaylist } from '@/types/spotify';

export default async function Playlists() {
  let playlists: {
    name: string;
    url: string;
    coverImage: string;
    tracks: number;
  }[] = [];
  let message: string | undefined;

  try {
    const data = await spotifyFetch<SpotifyPaginated<SpotifyPlaylist>>(
      '/me/playlists',
      { next: { revalidate: 3600 } }
    );

    const items = data?.items ?? [];
    if (!items.length) {
      message = 'No playlists found for this account.';
    } else {
      playlists = items.map((playlist) => ({
        name: playlist.name,
        url: playlist.external_urls.spotify,
        coverImage: playlist.images[0]?.url,
        tracks: playlist.tracks.total,
      }));
    }
  } catch (error) {
    if (!(error instanceof SpotifyError)) {
      console.error('Error loading playlists:', error);
    }
    message = 'Unable to load playlists right now.';
  }

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>Playlists</h2>
      {playlists.length === 0 ? (
        <p className='text-xs text-muted-foreground'>
          {message || 'No playlists found for this account.'}
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
