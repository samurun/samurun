'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

function toggleTheme(
  setTheme: (theme: string) => void,
  theme: string,
  event?: React.MouseEvent,
) {
  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? window.innerHeight / 2;

  document.documentElement.style.setProperty('--tx', `${x}px`);
  document.documentElement.style.setProperty('--ty', `${y}px`);

  if (!document.startViewTransition) {
    setTheme(theme);
    return;
  }

  document.documentElement.classList.add('theme-transition');

  const transition = document.startViewTransition(() => {
    setTheme(theme);
  });

  transition.finished.then(() => {
    document.documentElement.classList.remove('theme-transition');
  });
}

export default function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={(e) => toggleTheme(setTheme, 'light', e)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => toggleTheme(setTheme, 'dark', e)}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => toggleTheme(setTheme, 'system', e)}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
