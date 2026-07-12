export default function Loading() {
  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <div className='animate-pulse h-7 w-52 bg-secondary/50 rounded-md' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='animate-pulse h-96 bg-secondary/50 rounded-xl'
            />
          ))}
        </div>
      </div>
    </main>
  );
}
