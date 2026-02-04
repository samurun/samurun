import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { buttonVariants } from './ui/button';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section className='relative min-h-[60svh] flex items-center border-b border-border overflow-hidden'>
      <div className='absolute inset-0 grid-pattern opacity-[0.5] dark:opacity-[0.2] pointer-events-none' />
      <div className='container relative z-10 py-20 space-y-2'>
        <div className='space-y-4'>
          <div className='inline-flex items-center gap-2 px-2 py-1 bg-secondary border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
            </span>
            Available for work
          </div>
          <h1 className='text-5xl font-bold sm:text-7xl mb-0'>Fadlan</h1>
          <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed'>
            {siteConfig.description}
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-4'>
          <Link
            href={'/projects'}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'rounded-none font-mono text-xs px-8',
            )}
          >
            View Projects
          </Link>
          <Link
            href={siteConfig.links.github}
            target='_blank'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-none font-mono text-xs gap-2',
            )}
          >
            <GitHubLogoIcon className='h-4 w-4' />
            Github
          </Link>
        </div>
      </div>
    </section>
  );
}
