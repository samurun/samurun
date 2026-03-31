'use client';

import { Check, Copy, FileCode } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CodeFile {
  filename: string;
  code: string;
  highlightedCode: string;
  language?: string;
}

interface CodeBlockProps {
  files: CodeFile[];
  className?: string;
}

export function CodeBlock({ files, className }: CodeBlockProps) {
  const [selectedFile, setSelectedFile] = useState(files[0]?.filename ?? '');
  const [isCopied, setIsCopied] = useState(false);

  const currentFile =
    files.find((f) => f.filename === selectedFile) ?? files[0];

  const copy = async () => {
    if (!currentFile) return;
    try {
      await navigator.clipboard.writeText(currentFile.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden bg-[#0d1117]',
        className,
      )}
    >
      {/* Header with file selector */}
      <div className='flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]'>
        <div className='flex items-center gap-3'>
          <FileCode className='h-4 w-4 text-muted-foreground' />
          {files.length > 1 ? (
            <Select value={selectedFile} onValueChange={setSelectedFile}>
              <SelectTrigger className='h-7 w-45 border-0 bg-transparent text-xs font-mono text-muted-foreground hover:text-foreground focus:ring-0 focus:ring-offset-0'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {files.map((file) => (
                  <SelectItem
                    key={file.filename}
                    value={file.filename}
                    className='text-xs font-mono'
                  >
                    {file.filename}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className='text-xs font-mono text-muted-foreground'>
              {currentFile?.filename}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-md transition-all',
            'text-muted-foreground hover:text-foreground hover:bg-[#30363d]',
            isCopied && 'text-green-500 hover:text-green-500',
          )}
          aria-label='Copy code'
        >
          {isCopied ? (
            <Check className='h-3.5 w-3.5' />
          ) : (
            <Copy className='h-3.5 w-3.5' />
          )}
        </button>
      </div>

      {/* Code content */}
      <div className='overflow-x-auto'>
        {currentFile && (
          <div
            className='p-4 text-xs leading-relaxed [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0'
            dangerouslySetInnerHTML={{ __html: currentFile.highlightedCode }}
          />
        )}
      </div>
    </div>
  );
}
