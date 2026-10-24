import Link from 'next/link';

import { siteConfig } from '@/config/siteConfig';
import SpotifyPlayer from './spotify-player';

export default function Footer() {
  return (
    <footer className='bg-secondary/20'>
      <div className='container py-16'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <SpotifyPlayer />
            <p className='text-xs text-muted-foreground'>
              © {new Date().getFullYear()} Samurun
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-11 items-center rounded-md px-2 text-xs text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
            >
              Github
            </Link>
            <Link
              href='mailto:fadlan.jehteerokee@gmail.com'
              className='inline-flex min-h-11 items-center rounded-md px-2 text-xs text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
