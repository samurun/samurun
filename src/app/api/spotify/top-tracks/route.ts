import { topTracks } from '@/lib/spotify';

type SpotifyApiErrorPayload = {
    error?: {
        status?: number;
        message?: string;
    };
};

type SpotifyTrack = {
    artists: Array<{ name: string }>;
    external_urls: { spotify: string };
    name: string;
    album: {
        images: Array<{ url: string }>;
        name: string;
    };
};

export async function GET() {
    try {
        const response = await topTracks();

        if (!response.ok) {
            const errorPayload = (await response
                .json()
                .catch(() => null)) as SpotifyApiErrorPayload | null;
            const message =
                errorPayload?.error?.message ||
                'Spotify top tracks unavailable. Check token scopes (user-top-read).';

            return Response.json({ tracks: [], status: response.status, message });
        }

        const { items } = (await response.json()) as { items?: SpotifyTrack[] };

        if (!items?.length) {
            return Response.json({
                tracks: [],
                status: response.status,
                message: 'No top tracks found for this account.',
            });
        }

        const tracks = items.slice(0, 10).map((track) => ({
            artist: track.artists.map((_artist) => _artist.name).join(', '),
            songUrl: track.external_urls.spotify,
            title: track.name,
            albumImageUrl: track.album.images[0]?.url,
            album: track.album.name,
        }));

        return Response.json({ tracks, status: response.status });
    } catch (error) {
        console.error('Error in top-tracks route:', error);
        return Response.json({
            tracks: [],
            status: 500,
            message: 'Internal error while fetching top tracks.',
        });
    }
}
