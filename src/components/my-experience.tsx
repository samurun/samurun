import Image from 'next/image';

import { experiences, ExperienceType } from '@/data/experiences';
import { calculateDuration } from '@/lib/utils';

function ExperienceItem({ item }: { item: ExperienceType; isLast: boolean }) {
  return (
    <div className='group rounded-xl p-5 hover:bg-secondary/50 transition-colors duration-200'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='flex-none grid place-content-center size-10 bg-secondary border border-border/50 rounded-lg relative p-2'>
            <Image
              fill
              src={item.logo}
              alt={item.company}
              className='object-contain p-1.5'
              sizes='40px'
            />
          </div>
          <div>
            <h3 className='text-sm font-semibold tracking-tight'>
              {item.position}
            </h3>
            <p className='text-xs text-muted-foreground'>
              {item.company}{' '}
              <span className='text-muted-foreground/70'>({item.type})</span>
            </p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <span className='text-xs text-muted-foreground'>
            {item.startDate} — {item.endDate ? item.endDate : 'Present'}
          </span>
          <span className='hidden sm:block text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground'>
            {calculateDuration(item.startDate, item.endDate)}
          </span>
        </div>
      </div>
      <ul className='mt-3 list-disc pl-4 space-y-1.5 max-w-2xl'>
        {item.description.map((desc) => (
          <li
            key={desc}
            className='text-xs text-muted-foreground leading-relaxed'
          >
            {desc}
          </li>
        ))}
      </ul>
      <div className='mt-3 flex flex-wrap gap-1.5 pl-4'>
        {item.skills.map((skill) => (
          <span
            key={skill}
            className='text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground'
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MyExperience() {
  return (
    <section className='border-b border-border/50'>
      <div className='container py-20'>
        <div className='mb-12'>
          <h2 className='text-lg font-semibold tracking-tight'>Experience</h2>
        </div>
        <div className='space-y-1'>
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
