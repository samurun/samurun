'use client';

export const Equalizer = () => {
  return (
    <div className='flex items-end gap-px h-4 w-5'>
      <span className='w-1 bg-green-500 animate-[music-bar-1_0.8s_ease-in-out_infinite]'></span>
      <span className='w-1 bg-green-500 animate-[music-bar-2_1.2s_ease-in-out_infinite]'></span>
      <span className='w-1 bg-green-500 animate-[music-bar-3_1.0s_ease-in-out_infinite]'></span>
      <span className='w-1 bg-green-500 animate-[music-bar-4_0.9s_ease-in-out_infinite]'></span>
    </div>
  );
};
