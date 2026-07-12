'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='text-center py-20 rounded-xl border border-border/50 bg-card space-y-4'>
          <h2 className='text-lg font-semibold tracking-tight'>
            Something went wrong
          </h2>
          <p className='text-sm text-muted-foreground'>
            {error.digest ? `Error digest: ${error.digest}` : 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            className='text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors'
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
