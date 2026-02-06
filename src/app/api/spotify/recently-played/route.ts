import { recentlyPlayed } from '@/lib/spotify';

export async function GET() {
    try {
        const response = await recentlyPlayed();

        if (!response.ok) {
            return Response.json({ tracks: [] });
        }

        const { items } = await response.json();

        if (!items) {
            return Response.json({ tracks: [] });
        }

        const tracks = items.slice(0, 10).map((item: any) => ({
            artist: item.track.artists.map((_artist: any) => _artist.name).join(', '),
            songUrl: item.track.external_urls.spotify,
            title: item.track.name,
            albumImageUrl: item.track.album.images[0].url,
            playedAt: item.played_at,
        }));

        return Response.json({ tracks });
    } catch (error) {
        console.error('Error in recently-played route:', error);
        return Response.json({ tracks: [] });
    }
}
