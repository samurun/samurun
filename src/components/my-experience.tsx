import Image from 'next/image';

import { experiences, ExperienceType } from '@/data/experiences';
import { calculateDuration } from '@/lib/utils';

function ExperienceItem({ item }: { item: ExperienceType; isLast: boolean }) {
  return (
    <div className='group border-b border-border p-6 hover:bg-secondary transition-colors'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='flex-none grid place-content-center size-12 bg-secondary border border-border rounded-sm relative p-2 grayscale group-hover:grayscale-0 transition-all'>
            <Image
              fill
              src={item.logo}
              alt={item.company}
              className='object-contain p-2'
            />
          </div>
          <div>
            <h3 className='text-sm font-bold uppercase tracking-widest'>
              {item.position}
            </h3>
            <p className='text-xs font-mono text-muted-foreground'>
              {item.company}{' '}
              <span className='text-xs font-mono text-muted-foreground uppercase'>
                ({item.type})
              </span>
            </p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest'>
            {item.startDate} — {item.endDate ? item.endDate : 'Present'}
          </div>
          <div className='hidden sm:block font-mono text-[10px] px-2 py-0.5 border border-border bg-background text-muted-foreground'>
            {calculateDuration(item.startDate, item.endDate)}
          </div>
        </div>
      </div>
      <ul className='mt-4 list-disc pl-4 space-y-2 max-w-2xl'>
        {item.description.map((desc, i) => (
          <li
            key={i}
            className='text-[11px] text-muted-foreground leading-relaxed'
          >
            {desc}
          </li>
        ))}
      </ul>
      <div className='mt-4 flex flex-wrap gap-2 pl-4'>
        {item.skills.map((skill, i) => (
          <span key={i} className='text-[10px] font-mono tracking-widest'>
            #{skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MyExperience() {
  return (
    <section className='border-b border-border'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h2 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // EXPERIENCE
          </h2>
          <div className='h-1px flex-1 bg-border/50' />
        </div>
        <div className='border-t border-x border-border'>
          {experiences.map((item, idx) => (
            <ExperienceItem
              key={`${item.company}-${item.startDate}`}
              item={item}
              isLast={idx === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
