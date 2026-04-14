import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface LabCardItem {
  title: string;
  description: string;
  thumbnail: ReactNode;
  href: string;
  techStack: string[];
  updatedAt: string;
}

interface LabCardProps {
  item: LabCardItem;
  featured?: boolean;
}

const relativeTime = (isoDate: string) => {
  const date = new Date(isoDate);
  const diffMs = date.getTime() - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day');
  if (Math.abs(diffDays) < 365)
    return rtf.format(Math.round(diffDays / 30), 'month');
  return rtf.format(Math.round(diffDays / 365), 'year');
};

export default function LabCard({ item, featured }: LabCardProps) {
  return (
    <Link
      href={item.href}
      scroll={true}
      className={cn('group block', featured && 'md:col-span-2')}
    >
      <Card className='h-full hover:border-border transition-colors duration-200'>
        <CardHeader className={cn(featured && 'min-h-[200px]')}>
          {item.thumbnail}
        </CardHeader>
        <CardContent>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <h3
                  className={cn(
                    'font-semibold tracking-tight group-hover:text-primary transition-colors',
                    featured ? 'text-base' : 'text-sm',
                  )}
                >
                  {item.title}
                </h3>
                {featured && (
                  <span className='text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium'>
                    Featured
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'text-muted-foreground leading-relaxed mt-1',
                  featured ? 'text-sm line-clamp-3' : 'text-xs line-clamp-2',
                )}
              >
                {item.description}
              </p>
            </div>
            <ArrowUpRightIcon
              size={16}
              className='text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1'
            />
          </div>

          <div className='flex items-center justify-between gap-3 mt-4'>
            <div className='flex flex-wrap gap-1.5'>
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className='text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground'
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className='text-[11px] text-muted-foreground shrink-0'>
              Updated {relativeTime(item.updatedAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
