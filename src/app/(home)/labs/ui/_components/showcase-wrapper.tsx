'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import React, { Suspense, use } from 'react';
import { CodeBlock } from './code-block';
import { codeToHtml } from 'shiki';

interface CodeFile {
  filename: string;
  code: string;
  highlightedCode: string;
  language?: string;
}

interface ShowcaseWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  files?: CodeFile[];
  code?: string;
  className?: string;
}

async function highlightFiles(files: CodeFile[]): Promise<CodeFile[]> {
  return Promise.all(
    files.map(async (file) => ({
      ...file,
      highlightedCode: await codeToHtml(file.code, {
        lang: file.language ?? 'tsx',
        theme: 'github-dark',
      }),
    })),
  );
}

function highlightCode(code: string): Promise<CodeFile[]> {
  return codeToHtml(code, {
    lang: 'tsx',
    theme: 'github-dark',
  }).then((highlightedCode) => [
    {
      filename: 'component.tsx',
      code,
      highlightedCode,
      language: 'tsx',
    },
  ]);
}

function HighlightedCodeBlock({ filesPromise }: { filesPromise: Promise<CodeFile[]> }) {
  const files = use(filesPromise);
  return <CodeBlock files={files} />;
}

export function ShowcaseWrapper({
  title,
  description,
  children,
  files: filesProp,
  code,
  className,
}: ShowcaseWrapperProps) {
  const [tabsValue, setTabsValue] = React.useState('preview');

  const filesPromise = React.useMemo(() => {
    if (filesProp) return highlightFiles(filesProp);
    if (code) return highlightCode(code);
    return null;
  }, [code, filesProp]);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Tabs
            value={tabsValue}
            onValueChange={setTabsValue}
            className='w-full'
          >
            <TabsList variant='line'>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value='code'>Code</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent className='pt-4'>
        {tabsValue === 'preview' && (
          <div className='flex items-center justify-center min-h-96 max-h-96 overflow-auto'>
            {children}
          </div>
        )}
        {tabsValue === 'code' && filesPromise && (
          <div className='max-h-96 overflow-auto'>
            <Suspense
              fallback={
                <div className='flex items-center justify-center py-8 text-muted-foreground'>
                  Loading code...
                </div>
              }
            >
              <HighlightedCodeBlock filesPromise={filesPromise} />
            </Suspense>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
