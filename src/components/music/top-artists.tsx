import Image from 'next/image';

import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyArtist, SpotifyPaginated } from '@/types/spotify';

const TOP_LIMIT = 10;

export default async function TopArtists() {
  let artists: {
    name: string;
    url: string;
    coverImage: string;
    followers: number;
  }[] = [];
  let message: string | undefined;

  try {
    const data = await spotifyFetch<SpotifyPaginated<SpotifyArtist>>(
      '/me/top/artists',
      { next: { revalidate: 3600 } }
    );

    const items = data?.items ?? [];
    if (!items.length) {
      message = 'No top artists found for this account.';
    } else {
      artists = items.slice(0, TOP_LIMIT).map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
        coverImage: artist.images[1]?.url || artist.images[0]?.url || '',
        followers: artist.followers.total,
      }));
    }
  } catch (error) {
    if (!(error instanceof SpotifyError)) {
      console.error('Error loading top artists:', error);
    }
    message = 'Unable to load artists right now.';
  }

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>
        Top Artists
      </h2>
      {artists.length === 0 ? (
        <p className='text-xs text-muted-foreground'>
          {message || 'No top artists found for this account.'}
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
