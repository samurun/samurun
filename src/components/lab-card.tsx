import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

interface CardItem {
  title: string;
  description: string;
  thumbnail: ReactNode;
  href: string;
  tags: string[];
}

interface CardProps {
  item: CardItem;
}

export default function LabCard({ item }: CardProps) {
  return (
    <Card>
      <CardHeader>{item.thumbnail}</CardHeader>
      <CardContent>
        <div className='flex-1'>
          <Link href={item.href} scroll={true} className='inline-block'>
            <h3 className='text-sm font-semibold tracking-tight group-hover:text-primary transition-colors'>
              {item.title}
            </h3>
          </Link>
          <p className='text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2'>
            {item.description}
          </p>
        </div>
        <div className='flex flex-wrap gap-1.5 mt-4'>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className='text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground'
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
