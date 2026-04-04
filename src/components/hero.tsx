import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { buttonVariants } from './ui/button';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section className='mx-auto w-full max-w-5xl min-h-[79svh] relative'>
      {/* Subtle purple radial gradient */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,oklch(0.65_0.2_280_/_8%),transparent)]'
      />

      {/* Main content */}
      <div className='relative flex flex-col items-center justify-center gap-6 pt-32 pb-30'>
        <p
          className={cn(
            'group mx-auto flex w-fit items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 shadow-sm',
            'fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out',
          )}
        >
          <span className='size-1.5 rounded-full bg-green-500' />
          <span className='text-xs text-muted-foreground'>
            Available for work
          </span>
        </p>
        <h1
          className={cn(
            'fade-in slide-in-from-bottom-10 animate-in text-gradient text-balance font-semibold fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl',
          )}
        >
          {siteConfig.name}
        </h1>

        <p className='fade-in slide-in-from-bottom-10 px-4 mx-auto max-w-md animate-in fill-mode-backwards text-center text-base text-muted-foreground leading-relaxed delay-200 duration-500 ease-out sm:text-lg md:text-xl'>
          {siteConfig.description}
        </p>

        <div className='fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out'>
          <Link
            href={'/projects'}
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'gap-2 rounded-lg',
            )}
          >
            View Projects <ArrowRightIcon data-icon='inline-end' />
          </Link>
          <Link
            href={siteConfig.links.github}
            target='_blank'
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2 rounded-lg',
            )}
          >
            <GitHubLogoIcon data-icon='inline-start' /> GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
