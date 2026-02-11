import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RectangleEllipsisIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
                <CardContent className='space-y-2'>
                  {lab.image && (
                    <div className='aspect-video bg-black relative'>
                      <Image
                        fill
                        src={lab.image}
                        alt={lab.title}
                        className='w-full h-auto object-contain'
                      />
                    </div>
                  )}
                  <Link href={lab.href}>View Lab</Link>
                </CardContent>
              </Card>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
