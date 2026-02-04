import dayjs from 'dayjs';

import { hikings } from '@/data/hikings';
import { DATE_FORMAT } from '@/constants/format';

export default function Activities() {
  return (
    <main className='container max-w-4xl py-20'>
      <h1 className='text-4xl font-bold mb-8'>Hikings</h1>
      <div>
        {hikings.map((hiking) => (
          <div key={hiking.title} className='mb-4'>
            <h2 className='text-xl font-semibold'>
              {hiking.title}{' '}
              {hiking.hikes.length > 1 && (
                <span className='text-md'>({hiking.hikes.length}X)</span>
              )}
            </h2>
            <div>
              {hiking.hikes.map((hike, index) => (
                <div className='text-sm text-muted-foreground' key={index}>
                  <time dateTime={hike.startDate}>
                    <span className='px-0.5'>
                      {dayjs(hike.startDate).format(DATE_FORMAT)}
                    </span>
                  </time>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
