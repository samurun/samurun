export default function Loading() {
  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-8'>
          <div className='animate-pulse h-7 w-40 bg-secondary/50 rounded-md' />
        </div>
        <div className='animate-pulse h-24 bg-secondary/50 rounded-md mb-8' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className='animate-pulse h-48 bg-secondary/50 rounded-xl'
            />
          ))}
        </div>
      </div>
    </main>
  );
}
