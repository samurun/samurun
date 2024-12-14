import { Mail } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import SpotifyPlayer from './spotify-player';

export default function Footer() {
  return (
    <footer className='py-20 px-4'>
      <div className='text-center mb-4'>
        <SpotifyPlayer />
      </div>
      <div className='container mx-auto max-w-4xl text-center'>
        <div className='flex items-center justify-center gap-4 mb-4'>
          <Button variant='ghost' size='icon'>
            <Mail className='h-4 w-4' />
          </Button>
          <Link
            href={siteConfig.links.github}
            target='_blank'
            className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }))}
          >
            <GitHubLogoIcon className='h-4 w-4' />
          </Link>
        </div>
        <div className='text-sm text-muted-foreground'>© 2024 Fadlan</div>
      </div>
    </footer>
  );
}
