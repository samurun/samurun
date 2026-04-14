export type SpotifyApiErrorPayload = {
  error?: {
    status?: number;
    message?: string;
  };
};

export type SpotifyArtist = {
  name: string;
  external_urls: { spotify: string };
  images: Array<{ url: string }>;
  followers: { total: number };
};

export type SpotifyTrack = {
  artists: Array<{ name: string }>;
  external_urls: { spotify: string };
  name: string;
  album: {
    images: Array<{ url: string }>;
    name: string;
  };
};

export type SpotifyPlaylist = {
  name: string;
  external_urls: { spotify: string };
  images: Array<{ url: string }>;
  tracks: { total: number };
  description?: string;
};

export type SpotifyRecentItem = {
  track: SpotifyTrack;
  played_at: string;
};

export type SpotifyNowPlaying = {
  is_playing: boolean;
  item: SpotifyTrack | null;
};

export type SpotifyPaginated<T> = {
  items?: T[];
};
