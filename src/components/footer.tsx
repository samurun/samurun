import Link from 'next/link';
import { Suspense } from 'react';

import { siteConfig } from '@/config/siteConfig';
import SpotifyPlayer, { SpotifySkeleton } from './spotify-player';

export default function Footer() {
  return (
    <footer className='bg-secondary/30'>
      <div className='container py-12'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <Suspense fallback={<SpotifySkeleton />}>
              <SpotifyPlayer />
            </Suspense>
            <p className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest'>
              © {new Date().getFullYear()} SAMURUN
            </p>
          </div>
          <div className='flex items-center gap-6'>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              className='font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4'
            >
              Github
            </Link>
            <Link
              href='mailto:fadlan.jehteerokee@gmail.com'
              className='font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4'
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
