import Link from 'next/link';
import { Suspense } from 'react';

import { siteConfig } from '@/config/siteConfig';
import SpotifyPlayer, { SpotifySkeleton } from './spotify-player';

export default function Footer() {
  return (
    <footer className='bg-secondary/20'>
      <div className='container py-16'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <Suspense fallback={<SpotifySkeleton />}>
              <SpotifyPlayer />
            </Suspense>
            <p className='text-xs text-muted-foreground'>
              © {new Date().getFullYear()} Samurun
            </p>
          </div>
          <div className='flex items-center gap-6'>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              className='text-xs text-muted-foreground hover:text-foreground transition-colors'
            >
              Github
            </Link>
            <Link
              href='mailto:fadlan.jehteerokee@gmail.com'
              className='text-xs text-muted-foreground hover:text-foreground transition-colors'
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
