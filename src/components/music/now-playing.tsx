'use client';

import { type NowPlaying as NowPlayingData, useSpotifyQuery } from '@/hooks/use-spotify-query';
import { Equalizer } from './equalizer';

export default function NowPlaying() {
  const { data } = useSpotifyQuery<NowPlayingData>('now-playing', {
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });

  if (!data?.isPlaying || !data.song) return null;

  return (
    <a
      href={data.song.songUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='flex max-w-48 items-center gap-2 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
    >
      <Equalizer />
      <span className='truncate'>
        <span className='sr-only'>Now playing: </span>
        {data.song.title}
      </span>
    </a>
  );
}
