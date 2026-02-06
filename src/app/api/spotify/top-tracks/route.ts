import { topTracks } from '@/lib/spotify';

export async function GET() {
    try {
        const response = await topTracks();

        if (!response.ok) {
            return Response.json({ tracks: [] });
        }

        const { items } = await response.json();

        if (!items) {
            return Response.json({ tracks: [] });
        }

        const tracks = items.slice(0, 10).map((track: any) => ({
            artist: track.artists.map((_artist: any) => _artist.name).join(', '),
            songUrl: track.external_urls.spotify,
            title: track.name,
            albumImageUrl: track.album.images[0].url,
            album: track.album.name,
        }));

        return Response.json({ tracks });
    } catch (error) {
        console.error('Error in top-tracks route:', error);
        return Response.json({ tracks: [] });
    }
}
