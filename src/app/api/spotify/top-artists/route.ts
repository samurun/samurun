import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyArtist, SpotifyPaginated } from '@/types/spotify';

const TOP_LIMIT = 10;

export async function GET() {
  try {
    const data = await spotifyFetch<SpotifyPaginated<SpotifyArtist>>(
      '/me/top/artists'
    );

    const items = data?.items ?? [];
    if (!items.length) {
      return Response.json({
        artists: [],
        status: 200,
        message: 'No top artists found for this account.',
      });
    }

    const artists = items.slice(0, TOP_LIMIT).map((artist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
      coverImage: artist.images[1]?.url || artist.images[0]?.url || '',
      followers: artist.followers.total,
    }));

    return Response.json({ artists, status: 200 });
  } catch (error) {
    if (error instanceof SpotifyError) {
      return Response.json({
        artists: [],
        status: error.status,
        message:
          error.message ||
          'Spotify top artists unavailable. Check token scopes (user-top-read).',
      });
    }
    console.error('Error in top-artists route:', error);
    return Response.json(
      {
        artists: [],
        status: 500,
        message: 'Internal error while fetching top artists.',
      },
      { status: 500 }
    );
  }
}
