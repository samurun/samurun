'use client';

import Image from 'rc-image';
import 'rc-image/assets/index.css';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateCcwSquareIcon,
  RotateCwSquareIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className='mt-20'>
      <div className='flex items-center gap-4 mb-8'>
        <h2 className='text-xs font-mono font-bold uppercase tracking-[0.2em] opacity-50'>
          Gallery
        </h2>
        <div className='h-px flex-1 bg-border/30' />
      </div>
      <Image.PreviewGroup
        icons={{
          close: <XIcon />,
          left: <ChevronLeftIcon />,
          right: <ChevronRightIcon />,
          rotateLeft: <RotateCcwSquareIcon />,
          rotateRight: <RotateCwSquareIcon />,
          flipX: <FlipHorizontalIcon />,
          flipY: <FlipVerticalIcon />,
          zoomIn: <ZoomInIcon />,
          zoomOut: <ZoomOutIcon />,
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {images.map((image, index) => (
            <div
              key={index}
              className='relative w-full aspect-video border border-border overflow-hidden group cursor-zoom-in'
            >
              <Image
                src={image}
                alt={`${title} - ${index}`}
                className='w-full h-full object-cover'
                wrapperClassName='w-full h-full'
              />
            </div>
          ))}
        </div>
      </Image.PreviewGroup>
    </div>
  );
}
