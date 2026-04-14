import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyNowPlaying } from '@/types/spotify';

export async function GET() {
  try {
    const data = await spotifyFetch<SpotifyNowPlaying>(
      '/me/player/currently-playing',
      { cache: 'no-cache' }
    );

    if (!data || !data.item) {
      return Response.json({ status: 200, isPlaying: false });
    }

    return Response.json({
      status: 200,
      isPlaying: data.is_playing,
      song: {
        album: data.item.album.name,
        albumImageUrl: data.item.album.images[0]?.url,
        artist: data.item.artists.map((a) => a.name).join(', '),
        songUrl: data.item.external_urls.spotify,
        title: data.item.name,
      },
    });
  } catch (error) {
    if (error instanceof SpotifyError) {
      return Response.json({ status: error.status, isPlaying: false });
    }
    console.error('Error in now-playing route:', error);
    return Response.json(
      { status: 500, isPlaying: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
