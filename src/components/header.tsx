import { PercentIcon } from 'lucide-react';
import Link from 'next/link';

import NowPlaying from './music/now-playing';
import ModeToggle from './mode-toggle';

export default function Header() {
  return (
    <header className='sticky top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/50'>
      <div className='container h-14 flex items-center justify-between'>
        <Link
          href={'/'}
          aria-label='Home'
          className='size-10 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
        >
          <PercentIcon aria-hidden='true' className='size-4' />
        </Link>
        <div className='flex items-center gap-3'>
          <NowPlaying />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
