'use client';

import { ImagePreview, ImagePreviewGroup } from '@/components/ui/image-preview';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className='mt-20'>
      <div className='mb-8'>
        <h2 className='text-lg font-semibold tracking-tight'>Gallery</h2>
      </div>
      <ImagePreviewGroup>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {images.map((image, index) => (
            <div
              key={index}
              className='relative w-full aspect-video rounded-xl border border-border/50 overflow-hidden group cursor-zoom-in hover:border-border transition-all duration-200'
            >
              <ImagePreview
                src={image}
                alt={`${title} - ${index + 1}`}
                className='w-full h-full object-cover'
                wrapperClassName='w-full h-full'
              />
            </div>
          ))}
        </div>
      </ImagePreviewGroup>
    </div>
  );
}
