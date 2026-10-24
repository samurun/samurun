'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

type SpotifyEndpoint = 'now-playing';

export type Song = {
  album: string;
  albumImageUrl: string;
  artist: string;
  songUrl: string;
  title: string;
};

/** Response of /api/spotify/now-playing; `song` is absent when nothing is playing. */
export type NowPlaying = {
  isPlaying: boolean;
  song?: Song;
};

type Options<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;

export function useSpotifyQuery<T>(
  endpoint: SpotifyEndpoint,
  options?: Options<T>
) {
  return useQuery<T>({
    queryKey: ['spotify', endpoint],
    queryFn: async () => {
      const res = await fetch(`/api/spotify/${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      return res.json() as Promise<T>;
    },
    ...options,
  });
}
