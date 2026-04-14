import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyPaginated, SpotifyPlaylist } from '@/types/spotify';

export async function GET() {
  try {
    const data = await spotifyFetch<SpotifyPaginated<SpotifyPlaylist>>(
      '/me/playlists',
      { next: { revalidate: 3600 } }
    );

    const items = data?.items ?? [];
    if (!items.length) {
      return Response.json({
        playlists: [],
        status: 200,
        message: 'No playlists found for this account.',
      });
    }

    const playlists = items.map((playlist) => ({
      name: playlist.name,
      url: playlist.external_urls.spotify,
      coverImage: playlist.images[0]?.url,
      tracks: playlist.tracks.total,
      description: playlist.description,
    }));

    return Response.json({ playlists, status: 200 });
  } catch (error) {
    if (error instanceof SpotifyError) {
      return Response.json({
        playlists: [],
        status: error.status,
        message:
          error.message ||
          'Spotify playlists unavailable. Check token scopes (playlist-read-private).',
      });
    }
    console.error('Error in playlists route:', error);
    return Response.json(
      {
        playlists: [],
        status: 500,
        message: 'Internal error while fetching playlists.',
      },
      { status: 500 }
    );
  }
}
