import { getPlaylists } from '@/lib/spotify';

export async function GET() {
    try {
        const response = await getPlaylists();

        if (!response.ok) {
            return Response.json({ playlists: [] });
        }

        const { items } = await response.json();

        if (!items) {
            return Response.json({ playlists: [] });
        }

        const playlists = items.map((playlist: any) => ({
            name: playlist.name,
            url: playlist.external_urls.spotify,
            coverImage: playlist.images[0]?.url,
            tracks: playlist.tracks.total,
            description: playlist.description,
        }));

        return Response.json({ playlists });
    } catch (error) {
        console.error('Error in playlists route:', error);
        return Response.json({ playlists: [] });
    }
}
