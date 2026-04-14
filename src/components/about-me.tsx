import { ReactNode } from 'react';
import { Download } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TypescriptIcon } from './icons/typescrip-icon';
import { ReactjsIcon } from './icons/reactjs-icon';
import { NextjsIcon } from './icons/nextjs-icon';
import { TailwindcssIcon } from './icons/tailwindcss-icon';
import { MuiIcon } from './icons/mui-icon';
import { PostgresqlIcon } from './icons/postgresql-icon';
import { NestjsIcon } from './icons/nestjs-icon';
import { AntdIcon } from './icons/antd-icon';
import { DockerIcon } from './icons/docker-icon';
import { RedisIcon } from './icons/redis-icon';
import { RabbitMQIcon } from './icons/rabbit-mq-icon';
import { MinIOIcon } from './icons/minio-icon';
import { ElysiaIcon } from './icons/elysia-icon';

type TileData = {
  id: string;
  colSpan: number;
  logo?: ReactNode;
};

export default function AboutMe() {
  const tiles: TileData[] = [
    { id: 'typescript', colSpan: 1, logo: <TypescriptIcon /> },
    { id: 'nextjs', colSpan: 2, logo: <NextjsIcon /> },
    { id: 'reactjs', colSpan: 1, logo: <ReactjsIcon /> },
    { id: 'tailwindcss', colSpan: 2, logo: <TailwindcssIcon /> },
    { id: 'mui', colSpan: 1, logo: <MuiIcon /> },
    { id: 'antd', colSpan: 1, logo: <AntdIcon /> },
    { id: 'empty-0', colSpan: 1 },
    { id: 'elysia', colSpan: 2, logo: <ElysiaIcon /> },
    { id: 'nestjs', colSpan: 1, logo: <NestjsIcon /> },
    { id: 'empty-5', colSpan: 1 },
    { id: 'postgresql', colSpan: 1, logo: <PostgresqlIcon /> },
    { id: 'empty-6', colSpan: 1 },
    { id: 'docker', colSpan: 1, logo: <DockerIcon /> },
    { id: 'minio', colSpan: 2, logo: <MinIOIcon /> },
    { id: 'empty-7', colSpan: 1 },
    { id: 'empty-9', colSpan: 1 },
    { id: 'empty-15', colSpan: 2, logo: <RabbitMQIcon /> },
    { id: 'empty-16', colSpan: 1 },
    { id: 'redis', colSpan: 1, logo: <RedisIcon /> },

    // MinIO RabbitMQ
  ];

  return (
    <div className='mx-auto flex flex-col container py-20 grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center'>
      <div className='max-w-xl space-y-5'>
        <h2 className='font-semibold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl'>
          Hi, I&apos;m Fadlan
        </h2>
        <p className='text-lg text-muted-foreground leading-8'>
          With a passion for creating seamless user experiences and
          pixel-perfect designs, I&apos;ve had the opportunity to work on
          various projects that have honed my skills and expertise.
        </p>
        <p className='text-lg text-muted-foreground leading-8'>
          Beyond the code, I thrive in remote, cross-functional teams —
          collaborating with designers, backend engineers, and product
          owners across government, gaming, and environmental domains. I
          value clear communication, shared code-quality standards, and
          shipping on schedule.
        </p>
        <Button asChild variant='outline' size='sm'>
          <a href='/api/resume' download>
            <Download className='size-4' />
            Resume
          </a>
        </Button>
      </div>

      <div className='relative grid grid-cols-4 sm:grid-cols-8 gap-3'>
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={cn(
              'relative overflow-hidden flex h-auto items-center justify-center rounded-lg border transition-all w-full text-white p-2',
              tile.colSpan === 1 && 'aspect-square',
              tile.logo
                ? 'bg-card border-border/50 shadow-sm hover:border-primary/30'
                : 'bg-secondary/30 border-border/20',
            )}
            style={{
              gridColumn: `span ${tile.colSpan || 1} / span ${tile.colSpan || 1}`,
            }}
          >
            {tile.logo && (
              <div className='size-full grid place-content-center text-foreground [&_svg]:h-6 [&_svg]:w-auto [&_svg]:max-w-full'>
                {tile.logo}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
