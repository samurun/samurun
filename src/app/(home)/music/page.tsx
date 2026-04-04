import type { Metadata } from 'next';

import TopTracks from '@/components/music/top-tracks';
import NowPlaying from '@/components/music/now-playing';
import TopArtists from '@/components/music/top-artists';
import Playlists from '@/components/music/playlists';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Now playing, top tracks, artists, and playlists from Spotify.',
};

export default function MusicPage() {
  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Music Dashboard
          </h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1 space-y-6'>
            <NowPlaying />
            <TopArtists />
          </div>
          <div className='lg:col-span-1 space-y-6'>
            <TopTracks />
          </div>
          <div className='lg:col-span-1 space-y-6'>
            <Playlists />
          </div>
        </div>
      </div>
    </main>
  );
}
