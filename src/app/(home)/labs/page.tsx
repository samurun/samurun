import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Interactive frontend and visualization experiments.',
};

export default function Page() {
  const labs = [
    {
      title: 'ECharts',
      description: 'ECharts is a powerful charting library.',
      image: '/labs/echart.svg',
      href: '/labs/echarts',
    },
    {
      title: ' @tanstack/react-virtual',
      description:
        'Virtualize only the visible content for massive scrollable DOM',
      image: '/labs/react-virtual.svg',
      href: '/labs/virtual',
    },
  ];
  return (
    <div>
      <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {labs.map((lab) => (
          <li key={lab.title}>
            <Card>
              <CardHeader>
                <CardTitle>{lab.title}</CardTitle>
                <CardDescription className=' line-clamp-1'>
                  {lab.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='relative aspect-video p-0'>
                {lab.image && (
                  <div className='bg-black absolute inset-0 w-full'>
                    <Image
                      fill
                      src={lab.image}
                      alt={lab.title}
                      className='object-contain'
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link
                  href={lab.href}
                  className='text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-primary transition-colors'
                >
                  View Lab <ArrowRightIcon size={12} />
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
