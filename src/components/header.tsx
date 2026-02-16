'use client';

import { useQuery } from '@tanstack/react-query';
import {
  CodeXmlIcon,
  MountainIcon,
  MusicIcon,
  PercentIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Song } from './music/now-playing';
import { Equalizer } from './music/equalizer';
import ModeToggle from './mode-toggle';
import { Button } from './ui/button';

const NAV_MAIN_ITEMS = [{ label: 'Projects', href: '/projects' }];
const NAV_ITEMS = [
  { label: 'Labs', href: '/labs', icon: CodeXmlIcon },
  { label: 'Hiking', href: '/hiking', icon: MountainIcon },
  { label: 'Music', href: '/music', icon: MusicIcon },
];

export default function Header() {
  const { data } = useQuery<{ isPlaying: boolean; song: Song }>({
    queryKey: ['now-playing-large'],
    queryFn: () => fetch('/api/spotify/now-playing').then((res) => res.json()),
    refetchInterval: 10000,
  });

  return (
    <header className='sticky top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border'>
      <div className='container h-14 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <Link href={'/'} className='font-bold text-lg tracking-tight'>
            <PercentIcon className='size-4' />
          </Link>
          <nav className='hidden md:flex items-center gap-6'>
            {NAV_MAIN_ITEMS.map((item) => (
              <Button key={item.href} size='icon-sm' variant='ghost' asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            {NAV_ITEMS.map((item) => (
              <Button key={item.href} size='icon-sm' variant='ghost' asChild>
                <Link href={item.href}>
                  {item.label === 'Music' && data?.isPlaying ? (
                    <Equalizer />
                  ) : (
                    <item.icon className='size-4' />
                  )}
                </Link>
              </Button>
            ))}
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
