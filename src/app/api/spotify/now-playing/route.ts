import { currentlyPlayingSong } from '@/lib/spotify';

export async function GET() {
  try {
    const response = await currentlyPlayingSong();

    if (response.status === 204 || response.status > 400) {
      return Response.json({ status: 200, isPlaying: false });
    }
    const song = await response.json();

    if (song.item === null) {
      return Response.json({ status: 200, isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((_artist: { name: string }) => _artist.name)
      .join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return Response.json({
      status: 200,
      isPlaying,
      song: {
        album,
        albumImageUrl,
        artist,
        songUrl,
        title,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'some thing went wrong' });
  }
}
