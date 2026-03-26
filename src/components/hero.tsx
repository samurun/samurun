import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { buttonVariants } from './ui/button';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section className='mx-auto w-full max-w-5xl  min-h-[79svh] relative'>
      {/* Top Shades */}
      <div
        aria-hidden='true'
        className='absolute z-0 mx-auto  min-h-screen w-full max-w-5xl lg:block inset-0 isolate hidden overflow-hidden contain-strict'
      >
        <div className='absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-foreground/.08),transparent)] contain-strict' />
      </div>

      {/* X Bold Faded Borders */}
      <div
        aria-hidden='true'
        className='absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block'
      >
        <div className='mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15' />
        <div className='mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15' />
      </div>

      {/* main content */}

      <div className='relative flex flex-col items-center justify-center gap-5 pt-32 pb-30'>
        {/* X Content Faded Borders */}
        <div
          aria-hidden='true'
          className='absolute inset-0 -z-1 size-full overflow-hidden'
        >
          <div className='absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8' />
          <div className='absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8' />
          <div className='absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12' />
          <div className='absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12' />
        </div>

        <p
          className={cn(
            'group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow',
            'fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out',
          )}
        >
          <span className='text-xs'>Available for work</span>
        </p>
        <h1
          className={cn(
            'fade-in slide-in-from-bottom-10 animate-in text-balance font-medium fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl',
            'text-shadow-[0_0px_50px_theme(--color-foreground/.2)]',
          )}
        >
          {siteConfig.name}
        </h1>

        <p className='fade-in slide-in-from-bottom-10 mx-auto max-w-md animate-in fill-mode-backwards text-center text-base text-foreground/80 tracking-wider delay-200 duration-500 ease-out sm:text-lg md:text-xl'>
          {siteConfig.description}
        </p>

        <div className='fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out'>
          <Link
            href={'/projects'}
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'gap-2',
            )}
          >
            View Projects <ArrowRightIcon data-icon='inline-end' />
          </Link>
          <Link
            href={siteConfig.links.github}
            target='_blank'
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2',
            )}
          >
            <GitHubLogoIcon data-icon='inline-start' /> GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
