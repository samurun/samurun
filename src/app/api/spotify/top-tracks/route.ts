import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyPaginated, SpotifyTrack } from '@/types/spotify';

const TOP_LIMIT = 10;

export async function GET() {
  try {
    const data = await spotifyFetch<SpotifyPaginated<SpotifyTrack>>(
      '/me/top/tracks'
    );

    const items = data?.items ?? [];
    if (!items.length) {
      return Response.json({
        tracks: [],
        status: 200,
        message: 'No top tracks found for this account.',
      });
    }

    const tracks = items.slice(0, TOP_LIMIT).map((track) => ({
      artist: track.artists.map((a) => a.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumImageUrl: track.album.images[0]?.url,
      album: track.album.name,
    }));

    return Response.json({ tracks, status: 200 });
  } catch (error) {
    if (error instanceof SpotifyError) {
      return Response.json({
        tracks: [],
        status: error.status,
        message:
          error.message ||
          'Spotify top tracks unavailable. Check token scopes (user-top-read).',
      });
    }
    console.error('Error in top-tracks route:', error);
    return Response.json(
      {
        tracks: [],
        status: 500,
        message: 'Internal error while fetching top tracks.',
      },
      { status: 500 }
    );
  }
}
