'use client';
import ModeToggle from './mode-toggle';
import Link from 'next/link';

export const navItems = [
  {
    label: 'Project',
    href: '/projects',
  },
];

export default function Header() {
  return (
    <header className='sticky top-0 w-full z-50 bg-background/90'>
      <div className='container h-14 grid grid-cols-3 items-center justify-between'>
        <div className='flex justify-start'>
          <Link href={'/'} className='font-bold text-xl'>
            samurun
          </Link>
        </div>
        <div className='flex justify-center'>
          {/* <nav>
            <ul className='flex items-center gap-4 font-medium'>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-muted-foreground hover:text-foreground transition-colors',
                      pathname.includes(item.href) && 'text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}
        </div>
        <div className='flex justify-end'>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
