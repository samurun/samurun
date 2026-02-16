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

export default function Page() {
  const labs = [
    {
      title: 'ECharts',
      description: 'ECharts is a powerful charting library.',
      image: '/echart-thumbnail.png',
      href: '/labs/echarts',
    },
    {
      title: 'Lab 2',
      description: 'Lab 2 description',
      href: '/labs/lab-2',
      soon: true,
    },
  ];
  return (
    <div>
      <ul className='grid grid-cols-3 gap-4'>
        {labs.map((lab) => (
          <li key={lab.title}>
            {lab.soon ? (
              <Card key={lab.title} className='h-full'>
                <CardContent className='h-full space-y-2 flex flex-col items-center justify-center'>
                  <p>Soon</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{lab.title}</CardTitle>
                  <CardDescription>{lab.description}</CardDescription>
                </CardHeader>
                <CardContent className='relative aspect-video p-0'>
                  {lab.image && (
                    <div className='bg-black absolute inset-0'>
                      <Image
                        fill
                        src={lab.image}
                        alt={lab.title}
                        className='object-contain'
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link
                    href={lab.href}
                    className='text-sx text-muted-foreground inline-flex items-center gap-1 hover:text-primary transition-colors'
                  >
                    View Lab <ArrowRightIcon size={12} />
                  </Link>
                </CardFooter>
              </Card>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
