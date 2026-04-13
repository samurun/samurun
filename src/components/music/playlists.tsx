import Image from 'next/image';

import { getPlaylists } from '@/lib/spotify';

type SpotifyPlaylist = {
  name: string;
  external_urls: { spotify: string };
  images: Array<{ url: string }>;
  tracks: { total: number };
};

export default async function Playlists() {
  const response = await getPlaylists();

  let playlists: {
    name: string;
    url: string;
    coverImage: string;
    tracks: number;
  }[] = [];
  let message: string | undefined;

  if (!response.ok) {
    message = 'Unable to load playlists right now.';
  } else {
    const { items } = (await response.json()) as {
      items?: SpotifyPlaylist[];
    };

    if (!items?.length) {
      message = 'No playlists found for this account.';
    } else {
      playlists = items.map((playlist) => ({
        name: playlist.name,
        url: playlist.external_urls.spotify,
        coverImage: playlist.images[0]?.url,
        tracks: playlist.tracks.total,
      }));
    }
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
