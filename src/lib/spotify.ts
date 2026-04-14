import type { SpotifyApiErrorPayload } from '@/types/spotify';

interface SpotifyAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

const SPOTIFY_API = 'https://api.spotify.com/v1';
const TOKEN_SAFETY_BUFFER_MS = 60_000;

let cachedToken: { value: string; expiresAt: number } | null = null;

const fetchAccessToken = async (): Promise<SpotifyAccessTokenResponse> => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!refresh_token) {
    throw new Error('Refresh token not provided');
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Client ID or Client Secret not provided');
  }

  const authHeader = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString('base64')}`;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  return response.json();
};

const getAccessToken = async (): Promise<string> => {
  if (cachedToken && Date.now() < cachedToken.expiresAt - TOKEN_SAFETY_BUFFER_MS) {
    return cachedToken.value;
  }

  const data = await fetchAccessToken();
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
};

export class SpotifyError extends Error {
  constructor(
    public status: number,
    public payload: SpotifyApiErrorPayload | null
  ) {
    super(payload?.error?.message || `Spotify API error ${status}`);
    this.name = 'SpotifyError';
  }
}

type SpotifyFetchInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export async function spotifyFetch<T>(
  endpoint: string,
  init?: SpotifyFetchInit
): Promise<T | null> {
  const token = await getAccessToken();

  const res = await fetch(`${SPOTIFY_API}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });

  if (res.status === 204) return null;

  if (!res.ok) {
    const payload = (await res
      .json()
      .catch(() => null)) as SpotifyApiErrorPayload | null;
    throw new SpotifyError(res.status, payload);
  }

  return res.json() as Promise<T>;
}
