'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

type SpotifyEndpoint =
  | 'now-playing'
  | 'top-artists'
  | 'top-tracks'
  | 'recently-played'
  | 'playlists';

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
