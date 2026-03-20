import { topArtists } from '@/lib/spotify';

type SpotifyApiErrorPayload = {
    error?: {
        status?: number;
        message?: string;
    };
};

type SpotifyArtist = {
    name: string;
    external_urls: { spotify: string };
    images: Array<{ url: string }>;
    followers: { total: number };
};

export async function GET() {
    try {
        const response = await topArtists();

        if (!response.ok) {
            const errorPayload = (await response
                .json()
                .catch(() => null)) as SpotifyApiErrorPayload | null;
            const message =
                errorPayload?.error?.message ||
                'Spotify top artists unavailable. Check token scopes (user-top-read).';

            return Response.json({ artists: [], status: response.status, message });
        }

        const { items } = (await response.json()) as { items?: SpotifyArtist[] };

        if (!items?.length) {
            return Response.json({
                artists: [],
                status: response.status,
                message: 'No top artists found for this account.',
            });
        }

        const artists = items.slice(0, 10).map((artist) => ({
            name: artist.name,
            url: artist.external_urls.spotify,
            coverImage: artist.images[1]?.url || artist.images[0]?.url || '',
            followers: artist.followers.total,
        }));

        return Response.json({ artists, status: response.status });
    } catch (error) {
        console.error('Error in top-artists route:', error);
        return Response.json({
            artists: [],
            status: 500,
            message: 'Internal error while fetching top artists.',
        });
    }
}
