'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={copy}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md border border-border/30 bg-[#0d1117] text-muted-foreground transition-all hover:bg-[#161b22] hover:text-foreground',
        isCopied && 'border-green-500/50 text-green-500 opacity-100',
        className,
      )}
      aria-label='Copy code'
    >
      {isCopied ? (
        <Check className='h-3.5 w-3.5' />
      ) : (
        <Copy className='h-3.5 w-3.5' />
      )}
    </button>
  );
}
