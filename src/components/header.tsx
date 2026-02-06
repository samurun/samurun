'use client';

import { MountainIcon, MusicIcon, PercentIcon } from 'lucide-react';
import Link from 'next/link';

import ModeToggle from './mode-toggle';
import { Button } from './ui/button';

const NAV_ITEMS = [{ label: 'Projects', href: '/projects' }];

export default function Header() {
  return (
    <header className='sticky top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border'>
      <div className='container h-14 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <Link href={'/'} className='font-bold text-lg tracking-tight'>
            <PercentIcon className='size-4' />
          </Link>
          <nav className='hidden md:flex items-center gap-6'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Button size='icon-sm' variant='ghost' asChild>
              <Link href='/hiking'>
                <MountainIcon />
              </Link>
            </Button>
            <Button size='icon-sm' variant='ghost' asChild>
              <Link href='/music'>
                <MusicIcon />
              </Link>
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
