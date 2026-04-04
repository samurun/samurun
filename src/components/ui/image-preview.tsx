'use client';

import RcImage from 'rc-image';
import type { ImageProps, ImagePreviewType } from 'rc-image';
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

import { cn } from '@/lib/utils';

const previewIcons = {
  close: <XIcon className='size-4' />,
  left: <ChevronLeftIcon className='size-4' />,
  right: <ChevronRightIcon className='size-4' />,
  rotateLeft: <RotateCcwSquareIcon className='size-4' />,
  rotateRight: <RotateCwSquareIcon className='size-4' />,
  flipX: <FlipHorizontalIcon className='size-4' />,
  flipY: <FlipVerticalIcon className='size-4' />,
  zoomIn: <ZoomInIcon className='size-4' />,
  zoomOut: <ZoomOutIcon className='size-4' />,
};

function ImagePreview({
  className,
  wrapperClassName,
  preview,
  ...props
}: ImageProps) {
  const previewConfig: ImagePreviewType =
    typeof preview === 'object'
      ? { icons: previewIcons, ...preview }
      : preview === false
        ? (false as unknown as ImagePreviewType)
        : { icons: previewIcons };

  return (
    <RcImage
      className={cn('object-cover', className)}
      wrapperClassName={cn('', wrapperClassName)}
      preview={previewConfig}
      {...props}
    />
  );
}

function ImagePreviewGroup({
  children,
  ...props
}: React.ComponentProps<typeof RcImage.PreviewGroup>) {
  return (
    <RcImage.PreviewGroup icons={previewIcons} {...props}>
      {children}
    </RcImage.PreviewGroup>
  );
}

export { ImagePreview, ImagePreviewGroup };
