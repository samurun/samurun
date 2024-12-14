interface SpotifyAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

const getAccessToken = async (): Promise<SpotifyAccessTokenResponse> => {
  const refresh_token: string | undefined = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!refresh_token) {
    throw new Error('Refresh token not provided');
  }

  const clientId: string | undefined = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret: string | undefined = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Client ID or Client Secret not provided');
  }

  const authHeader: string = `Basic ${Buffer.from(
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

export const topTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const topArtists = async () => {
  const { access_token } = await getAccessToken();

  return fetch('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const currentlyPlayingSong = async () => {
  const { access_token } = await getAccessToken();

  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-cache',
  });
};
