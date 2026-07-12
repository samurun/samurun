import Image from 'next/image';

import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyPaginated, SpotifyTrack } from '@/types/spotify';

const TOP_LIMIT = 10;

export default async function TopTracks() {
  let tracks: {
    artist: string;
    songUrl: string;
    title: string;
    albumImageUrl: string;
    album: string;
  }[] = [];
  let message: string | undefined;

  try {
    const data = await spotifyFetch<SpotifyPaginated<SpotifyTrack>>(
      '/me/top/tracks',
      { next: { revalidate: 3600 } }
    );

    const items = data?.items ?? [];
    if (!items.length) {
      message = 'No top tracks found for this account.';
    } else {
      tracks = items.slice(0, TOP_LIMIT).map((track) => ({
        artist: track.artists.map((a) => a.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
        albumImageUrl: track.album.images[0]?.url,
        album: track.album.name,
      }));
    }
  } catch (error) {
    if (!(error instanceof SpotifyError)) {
      console.error('Error loading top tracks:', error);
    }
    message = 'Unable to load tracks right now.';
  }

  return (
    <div className='border border-border/50 rounded-xl bg-card p-6'>
      <h2 className='text-lg font-semibold tracking-tight mb-6'>
        Top Tracks
      </h2>
      {tracks.length === 0 ? (
        <p className='text-xs text-muted-foreground'>
          {message || 'No top tracks found for this account.'}
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
