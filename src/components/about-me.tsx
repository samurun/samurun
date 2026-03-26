import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { TypescriptIcon } from './icons/typescrip-icon';
import { ReactjsIcon } from './icons/reactjs-icon';
import { NextjsIcon } from './icons/nextjs-icon';
import { TailwindcssIcon } from './icons/tailwindcss-icon';
import { MuiIcon } from './icons/mui-icon';
import { PostgresqlIcon } from './icons/postgresql-icon';
import { NestjsIcon } from './icons/nestjs-icon';
import { AntdIcon } from './icons/antd-icon';
import { DockerIcon } from './icons/docker-icon';

type TileData = {
  id: string;
  colSpan: number;
  logo?: ReactNode;
};

export default function AboutMe() {
  const tiles: TileData[] = [
    // Row 0

    {
      id: 'typescript',
      colSpan: 2,
      logo: <TypescriptIcon />,
    },
    {
      id: 'empty-1',
      colSpan: 1,
    },
    {
      id: 'empty-2',
      colSpan: 1,
    },
    {
      id: 'reactjs',
      colSpan: 1,
      logo: <ReactjsIcon />,
    },
    {
      id: 'empty-3',
      colSpan: 1,
    },
    {
      id: 'nextjs',
      colSpan: 2,
      logo: <NextjsIcon />,
    },

    // Row 1
    {
      id: 'empty-6',
      colSpan: 1,
    },
    {
      id: 'tailwindcss',
      colSpan: 1,
      logo: <TailwindcssIcon />,
    },
    {
      id: 'empty-7',
      colSpan: 1,
    },
    {
      id: 'empty-9',
      colSpan: 1,
    },
    {
      id: 'antd',
      colSpan: 2,
      logo: <AntdIcon />,
    },
    {
      id: 'empty-10',
      colSpan: 1,
    },
    {
      id: 'mui',
      colSpan: 1,
      logo: <MuiIcon />,
    },
    // Row 2
    {
      id: 'empty-11',
      colSpan: 1,
    },
    {
      id: 'nestjs',
      colSpan: 2,
      logo: <NestjsIcon />,
    },
    {
      id: 'postgresql',
      colSpan: 1,
      logo: <PostgresqlIcon />,
    },
    {
      id: 'empty-12',
      colSpan: 1,
    },
    {
      id: 'empty-14',
      colSpan: 1,
    },
    {
      id: 'docker',
      colSpan: 1,
      logo: <DockerIcon />,
    },
    {
      id: 'empty-15',
      colSpan: 1,
    },
  ];

  const cards = [
    {
      title: "Hi, I'm Fadlan",
      description:
        "With a passion for creating seamless user experiences and pixel-perfect designs, I've had the opportunity to work on various projects that have honed my skills and expertise.",
      image: '/profile.png',
      label: 'INTRO',
    },
    {
      title: 'Tech Stack',
      description:
        'This combination of technologies allows me to create efficient, scalable, and maintainable applications.',
      image: '/stack.png',
      label: 'STACK',
    },
    {
      title: 'Technical',
      description:
        'With over 4 years of experience in web development, I specialize in building scalable applications using modern technologies and best practices.',
      image: '/technical.png',
      label: 'EXP',
    },
    {
      title: 'Work Philosophy',
      description:
        'I believe in writing clean, maintainable code and creating intuitive user experiences. My approach combines creativity with technical excellence.',
      image: '/work-philosophy.png',
      label: 'METHOD',
    },
  ];

  return (
    <div className='mx-auto flex flex-col container py-20 grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center'>
      <div className='max-w-xl space-y-5'>
        <h2 className='font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl'>
          Hi, I'm Fadlan
        </h2>
        <p className='text-lg text-muted-foreground leading-8'>
          With a passion for creating seamless user experiences and
          pixel-perfect designs, I've had the opportunity to work on various
          projects that have honed my skills and expertise.
        </p>
      </div>

      <div className='relative grid grid-cols-4 sm:grid-cols-8 gap-2'>
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={cn(
              'flex h-auto items-center justify-center border transition-all w-full text-white p-2',
              tile.colSpan === 1 && 'aspect-square',
              tile.logo
                ? 'bg-white shadow-sm dark:bg-muted/70 hover:border '
                : 'bg-border/20 dark:bg-muted/20 border-border/20',
            )}
            style={{
              gridColumn: `span ${tile.colSpan || 1} / span ${tile.colSpan || 1};`,
            }}
          >
            {tile.logo && (
              <div className='size-full grid place-content-center text-foreground [&_svg]:size-9'>
                {tile.logo}{' '}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
