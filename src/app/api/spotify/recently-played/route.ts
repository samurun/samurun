import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyPaginated, SpotifyRecentItem } from '@/types/spotify';

const RECENT_LIMIT = 10;

export async function GET() {
  try {
    const data = await spotifyFetch<SpotifyPaginated<SpotifyRecentItem>>(
      '/me/player/recently-played',
      { next: { revalidate: 60 } }
    );

    const items = data?.items ?? [];

    const tracks = items.slice(0, RECENT_LIMIT).map((item) => ({
      artist: item.track.artists.map((a) => a.name).join(', '),
      songUrl: item.track.external_urls.spotify,
      title: item.track.name,
      albumImageUrl: item.track.album.images[0]?.url,
      playedAt: item.played_at,
    }));

    return Response.json({ tracks });
  } catch (error) {
    if (error instanceof SpotifyError) {
      return Response.json({ tracks: [], status: error.status });
    }
    console.error('Error in recently-played route:', error);
    return Response.json({ tracks: [] }, { status: 500 });
  }
}
