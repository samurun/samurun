import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen flex items-center justify-center'>
      <div className='text-center space-y-4'>
        <h1 className='text-lg font-semibold tracking-tight'>404</h1>
        <p className='text-sm text-muted-foreground'>
          Could not find the requested page.
        </p>
        <Link
          href='/'
          className='inline-block text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors'
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
