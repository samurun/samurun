import { cn } from '@/lib/utils';

export function Carousel() {
  return (
    <div className='h-[stretch] relative flex items-center'>
      <div className='w-px h-full absolute top-0 bottom-0 left-1/2 bg-amber-500 translate-x-[50%]' />
      <ul
        data-slot='scoller'
        className={cn(
          'flex space-x-4 overflow-x-auto [scrollbar-width:none] -ms-overflow-style:none', // ซ่อน scrollbar ใน Firefox และ IE
          'scroll-smooth snap-x', // ใช้ scroll-smooth เพื่อให้การเลื่อนดูไหลลื่น และ snap-x snap-mandatory เพื่อให้เลื่อนแล้วหยุดที่แต่ละ item อย่างแม่นยำ
        )}
      >
        {/*ใช้ li สองตัวนี้เป็น offset ด้านหน้าเพื่อให้ item
        แรกและสุดท้ายสามารถเลื่อนมาอยู่ตรงกลางได้ */}
        <li
          data-slot='start-offset'
          aria-hidden='true'
          className='w-[15%] h-0 shrink-0 snap-align-none'
        />
        {new Array(10).fill(0).map((_, num) => (
          <li
            data-slot='item'
            key={num}
            className={cn(
              'border rounded aspect-video w-[70%] shrink-0 flex items-center justify-center text-lg font-medium bg-muted text-muted-foreground',
              'snap-center', // ทำให้แต่ละ item เป็นจุดหยุดของการ snap
            )}
          >
            Item {num}
          </li>
        ))}
        {/* // ใช้ li สองตัวนี้เป็น offset ด้านหลัง เพื่อให้ item แรกและสุดท้ายสามารถเลื่อนมาอยู่ตรงกลางได้ */}
        <li
          data-slot='end-offset'
          aria-hidden='true'
          className='w-[15%] h-0 shrink-0 snap-align-none'
        />
      </ul>
    </div>
  );
}
