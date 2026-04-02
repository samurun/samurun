import Link from 'next/link';
import Image from 'next/image';

interface CardItem {
  title: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
}

interface CardProps {
  item: CardItem;
}

export default function Card({ item }: CardProps) {
  return (
    <div className='group flex flex-col h-full overflow-hidden'>
      <div className='aspect-video relative overflow-hidden bg-secondary border-b border-border grayscale group-hover:grayscale-0 transition-all duration-500'>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className='font-mono text-[8px] px-1 border border-foreground/20 bg-background/80'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='space-y-3 flex-1 flex flex-col'>
        <div className='space-y-1 flex-1 p-4 m-0'>
          <Link href={item.href} scroll={true} className='inline-block'>
            <h3 className='text-sm font-bold uppercase tracking-widest group-hover:underline'>
              {item.title}
            </h3>
          </Link>
          <p className='text-xs text-muted-foreground leading-relaxed line-clamp-2'>
            {item.description}
          </p>
        </div>
        <div className='flex items-center justify-between pt-4 border-t border-border/50 p-4'>
          <div className='flex gap-2'>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className='font-mono text-[9px] uppercase tracking-tighter text-muted-foreground'
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={item.href}
            className='font-mono text-[9px] uppercase hover:underline'
          >
            View &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
