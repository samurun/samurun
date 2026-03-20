import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes, useId } from 'react';

type Side = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  tooltip: string;
  side?: Side;
  children: React.ReactElement<
    HTMLAttributes<HTMLElement> & { style?: React.CSSProperties }
  >;
}

function Tooltip({ tooltip, side = 'top', children }: TooltipProps) {
  const id = useId();
  // สร้างชื่อ Anchor ที่ไม่ซ้ำกัน
  const anchorName = `--btn-${id.replace(/[:]/g, '')}`;

  // 1. จัดการการ Clone Child เพื่อฉีด Props เข้าไป
  const trigger = React.cloneElement(children, {
    'aria-describedby': id,
    // รวม className เดิมเข้ากับ 'peer'
    className: cn('peer', children.props.className),
    style: {
      ...children.props.style,
      anchorName, // กำหนดชื่อ Anchor ให้กับตัว Trigger
    } as React.CSSProperties,
  });

  return (
    <div className='relative inline-block'>
      {trigger}

      <div
        id={id}
        role='tooltip'
        className={cn(
          'absolute z-50 w-max px-3 py-1.5 text-xs rounded-md shadow-md',
          'pointer-events-none select-none transition-all duration-200',
          'invisible opacity-0',
          'peer-hover:visible peer-hover:opacity-100 peer-hover:translate-0',
          'peer-focus-visible:visible peer-focus-visible:opacity-100 peer-focus-visible:translate-0',

          /* --- ✨ REVERT COLORS --- */
          'bg-black text-white dark:bg-white dark:text-black',

          /* --- ⚓ ANCHOR POSITIONING LOGIC --- */
          '[position-anchor:var(--anchor-name)]',

          // TOP: จัดกลางด้วย [left:anchor(center)] และ [-webkit-transform:translateX(-50%)]
          side === 'top' && [
            'bottom-[anchor(top)] mb-2 translate-y-1',
            'left-[anchor(center)] [-webkit-transform:translateX(-50%)] transform-[translateX(-50%)]',
            'peer-hover:translate-y-0 peer-focus-visible:translate-y-0',
          ],

          // BOTTOM: จัดกลางด้วย justify-self
          side === 'bottom' && [
            'top-[anchor(bottom)] mt-2 -translate-y-1',
            'left-[anchor(center)] [-webkit-transform:translateX(-50%)] transform-[translateX(-50%)]',
            'peer-hover:translate-y-0 peer-focus-visible:translate-y-0',
          ],

          // LEFT: จัดกลางด้วย align-self
          side === 'left' && [
            'right-[anchor(left)] [align-self:anchor-center] mr-2 translate-x-2',
          ],

          // RIGHT: จัดกลางด้วย align-self
          side === 'right' && [
            'left-[anchor(right)] [align-self:anchor-center] ml-2 -translate-x-2',
          ],
        )}
        style={{ '--anchor-name': anchorName } as React.CSSProperties}
      >
        {tooltip}

        {/* --- Tooltip Arrow --- */}
        <div
          className={cn(
            'absolute border-4 border-transparent',
            side === 'top' &&
              'top-full left-1/2 -translate-x-1/2 border-t-black dark:border-t-white',
            side === 'bottom' &&
              'bottom-full left-1/2 -translate-x-1/2 border-b-black dark:border-b-white',
            side === 'left' &&
              'left-full top-1/2 -translate-y-1/2 border-l-black dark:border-l-white',
            side === 'right' &&
              'right-full top-1/2 -translate-y-1/2 border-r-black dark:border-r-white',
          )}
        />
      </div>
    </div>
  );
}

export function AnchorTooltip() {
  return (
    <div className='flex flex-wrap gap-8 py-32 px-20 justify-center'>
      <Tooltip tooltip='Inverted Top Tooltip' side='top'>
        <Button variant='outline' style={{ anchorName: 'btn-top' }}>
          Hover me (Top)
        </Button>
      </Tooltip>
      <Tooltip tooltip='Inverted Bottom Tooltip' side='bottom'>
        <Button variant='outline' style={{ anchorName: 'btn-bottom' }}>
          Hover me (Bottom)
        </Button>
      </Tooltip>
      <Tooltip tooltip='Inverted Right Tooltip' side='right'>
        <Button variant='outline' style={{ anchorName: 'btn-right' }}>
          Hover me (Right)
        </Button>
      </Tooltip>
      <Tooltip tooltip='Inverted Left Tooltip' side='left'>
        <Button variant='outline' style={{ anchorName: 'btn-left' }}>
          Hover me (Left)
        </Button>
      </Tooltip>
    </div>
  );
}
