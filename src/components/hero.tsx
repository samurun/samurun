import { buttonVariants } from './ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section className='h-[70svh] flex items-center'>
      <div className='container'>
        <div className='space-y-6 text-center'>
          <div className='space-y-4'>
            <h1 className='text-5xl font-semibold sm:text-7xl tracking-tight '>
              Hi, I&apos;m
              <span className='ml-2 font-black bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text'>
                Fadlan
              </span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {siteConfig.description}
            </p>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <Link
              href={'/posts'}
              className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
            >
              View my blog
            </Link>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              className={cn(buttonVariants({ variant: 'default' }), 'gap-2')}
            >
              <GitHubLogoIcon className='h-4 w-4' />
              Github
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
