export default function MonthlyActivities() {
  const activities = [
    { label: 'Total Activities', value: '1' },
    { label: 'Total Time', value: '1h 22m' },
    { label: 'Total Distance', value: '0 km' },
  ];

  return (
    <section className='border-b border-border/50'>
      <div className='container py-20'>
        <div className='mb-12'>
          <h2 className='text-lg font-semibold tracking-tight'>
            Monthly Stats
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {activities.map((item, i) => (
            <div
              key={i}
              className='rounded-xl border border-border/50 bg-card p-8 hover:border-border transition-colors'
            >
              <div className='text-3xl font-bold tracking-tight'>
                {item.value}
              </div>
              <div className='text-xs text-muted-foreground mt-2'>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
