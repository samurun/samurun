import { SpotifyError, spotifyFetch } from '@/lib/spotify';
import type { SpotifyNowPlaying } from '@/types/spotify';

export async function GET() {
  try {
    const data = await spotifyFetch<SpotifyNowPlaying>(
      '/me/player/currently-playing',
      { cache: 'no-store' }
    );

    if (!data || !data.item) {
      return Response.json({ isPlaying: false });
    }

    return Response.json({
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
    // Spotify being down or rate-limiting just means "not playing" for the UI
    if (error instanceof SpotifyError) {
      console.warn(`Spotify API error ${error.status}: ${error.message}`);
      return Response.json({ isPlaying: false });
    }
    console.error('Error in now-playing route:', error);
    return Response.json(
      { isPlaying: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
