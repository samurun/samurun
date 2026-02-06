'use client';

import TopTracks from '@/components/music/top-tracks';
import NowPlaying from '@/components/music/now-playing';
import TopArtists from '@/components/music/top-artists';
import Playlists from '@/components/music/playlists';

export default function MusicPage() {
  return (
    <div className='container py-20'>
      <div className='flex items-center gap-4 mb-12'>
        <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
          // MUSIC DASHBOARD
        </h1>
        <div className='h-px flex-1 bg-border/50' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-1 space-y-8'>
          <NowPlaying />
          <TopArtists />
        </div>
        <div className='lg:col-span-1 space-y-8'>
          <TopTracks />
        </div>
        <div className='lg:col-span-1 space-y-8'>
          <Playlists />
        </div>
      </div>
    </div>
  );
}
