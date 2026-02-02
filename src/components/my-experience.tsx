import { experiences, WxperienceType } from '@/data/experiences';
import { calculateDuration } from '@/lib/utils';
import Image from 'next/image';

const SectionHeader = (
  <h1 className='text-center text-4xl font-black'>
    <span className='font-normal'>My</span> Experience
  </h1>
);

function ExperienceItem({
  item,
  isLast,
}: {
  item: WxperienceType;
  isLast: boolean;
}) {
  return (
    <div className='hover:bg-border/50 p-4 rounded-lg group cursor-pointer'>
      <div className='grid grid-cols-[80px_1fr] gap-x-4 md:gap-x-10 gap-4'>
        <div className='flex flex-col gap-y-2'>
          <div className='flex-none grid place-content-center size-20 bg-border group-hover:bg-border rounded-md relative p-3 object-center'>
            <Image
              width={64}
              height={64}
              src={item.logo}
              alt={item.company}
              className='object-contain object-center mix-blend-difference'
            />
          </div>
          {isLast ? null : (
            <div className='w-[2px] h-full border-border bg-border rounded-full group-hover:bg-muted-foreground bottom-0 mx-auto transition-colors duration-200' />
          )}
        </div>
        <div>
          <p>{item.company}</p>
          <div className='text-sm text-muted-foreground flex flex-col md:flex-row gap-x-2'>
            <span>{item.position}</span>·
            <span>
              {item.startDate} - {item.endDate ? item.endDate : 'Present'}
            </span>
            ·<span>{calculateDuration(item.startDate, item.endDate)}</span>
          </div>
          <div
            className='mt-3 text-muted-foreground group-hover:text-foreground line-clamp-3 min-h-[72px]'
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      </div>
    </div>
  );
}

export default function MyExperience() {
  return (
    <section className=''>
      <div className='max-w-5xl mx-auto px-6 md:px-4 py-20 space-y-8'>
        {SectionHeader}
        <div className='flex flex-col border dark:bg-card/44 rounded-xl p-6 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]'>
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
