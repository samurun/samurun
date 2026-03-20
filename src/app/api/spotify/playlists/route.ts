import { getPlaylists } from '@/lib/spotify';

type SpotifyApiErrorPayload = {
    error?: {
        status?: number;
        message?: string;
    };
};

type SpotifyPlaylist = {
    name: string;
    external_urls: { spotify: string };
    images: Array<{ url: string }>;
    tracks: { total: number };
    description?: string;
};

export async function GET() {
    try {
        const response = await getPlaylists();

        if (!response.ok) {
            const errorPayload = (await response
                .json()
                .catch(() => null)) as SpotifyApiErrorPayload | null;
            const message =
                errorPayload?.error?.message ||
                'Spotify playlists unavailable. Check token scopes (playlist-read-private).';

            return Response.json({ playlists: [], status: response.status, message });
        }

        const { items } = (await response.json()) as { items?: SpotifyPlaylist[] };

        if (!items?.length) {
            return Response.json({
                playlists: [],
                status: response.status,
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

        return Response.json({ playlists, status: response.status });
    } catch (error) {
        console.error('Error in playlists route:', error);
        return Response.json({
            playlists: [],
            status: 500,
            message: 'Internal error while fetching playlists.',
        });
    }
}
