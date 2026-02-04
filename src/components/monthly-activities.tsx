import { Card, CardContent } from './ui/card';

export default function MonthlyActivities() {
  const activities = [
    { label: 'Total Activities', value: '1' },
    { label: 'Total Time', value: '1h 22m' },
    { label: 'Total Distance', value: '0 km' },
  ];

  return (
    <section className='border-b border-border bg-secondary/10'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h2 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // MONTHLY STATS
          </h2>
          <div className='h-[1px] flex-1 bg-border/50' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 border-t border-l border-border'>
          {activities.map((item, i) => (
            <div
              key={i}
              className='p-8 border-r border-b border-border hover:bg-secondary/50 transition-colors'
            >
              <div className='text-3xl font-bold tracking-tighter font-mono'>
                {item.value}
              </div>
              <div className='text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-2'>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
