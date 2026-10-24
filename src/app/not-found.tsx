import Link from 'next/link';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { buttonVariants } from '@/components/ui/button';

// Lives outside the (home) group, so it renders the header/footer itself
export default function NotFound() {
  return (
    <>
      <Header />
      <main className='container flex min-h-[70svh] flex-col items-center justify-center gap-4 text-center'>
        <p className='text-sm text-muted-foreground'>404</p>
        <h1 className='text-3xl font-semibold tracking-tight'>Page not found</h1>
        <Link href='/' className={buttonVariants({ variant: 'outline' })}>
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
