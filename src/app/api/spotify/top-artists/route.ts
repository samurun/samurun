import { topArtists } from '@/lib/spotify';

export async function GET() {
    try {
        const response = await topArtists();

        if (!response.ok) {
            return Response.json({ artists: [] });
        }

        const { items } = await response.json();

        if (!items) {
            return Response.json({ artists: [] });
        }

        const artists = items.slice(0, 10).map((artist: any) => ({
            name: artist.name,
            url: artist.external_urls.spotify,
            coverImage: artist.images[1].url,
            followers: artist.followers.total,
        }));

        return Response.json({ artists });
    } catch (error) {
        console.error('Error in top-artists route:', error);
        return Response.json({ artists: [] });
    }
}
