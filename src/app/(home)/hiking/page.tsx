import { hikings, HikingType } from '@/data/hikings';

export const metadata = {
  title: 'Hiking',
  description: 'My hiking adventures',
};

function HikingItem({ item }: { item: HikingType }) {
  return (
    <div className='group border-b border-border p-6 hover:bg-secondary transition-colors'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div>
            <h3 className='text-sm font-bold uppercase tracking-widest'>
              {item.title}
            </h3>
            {item.distance && (
              <p className='text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1'>
                Total Distance: {item.distance} km
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          {item.hikes.map((hike, idx) => (
            <div key={idx} className='flex items-center gap-4'>
              <div className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest'>
                {hike.startDate} — {hike.endDate ? hike.endDate : 'Present'}
              </div>
              <div className='hidden sm:block font-mono text-[10px] px-2 py-0.5 border border-border bg-background text-muted-foreground'>
                Completed
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // HIKING TRIPS
          </h1>
          <div className='h-[1px] flex-1 bg-border/50' />
        </div>
        <div className='border-t border-x border-border'>
          {hikings.map((item, idx) => (
            <HikingItem key={`${item.title}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
