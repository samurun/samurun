'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className='container flex min-h-[70svh] flex-col items-center justify-center gap-4 text-center'>
      <p className='text-sm text-muted-foreground'>Error</p>
      <h1 className='text-3xl font-semibold tracking-tight'>
        Something went wrong
      </h1>
      <Button variant='outline' onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
