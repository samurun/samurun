'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  FolderIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronDownIcon,
  HomeIcon,
  BarChart3Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/(auth)/login/actions';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/portal', icon: LayoutDashboardIcon },
  { label: 'Tech Stack', href: '/portal/tech-stack', icon: FolderIcon },
  { label: 'Experience', href: '/portal/experience', icon: BarChart3Icon },
];

const settingsNavItems: NavItem[] = [
  { label: 'Settings', href: '/portal/settings', icon: SettingsIcon },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className='max-w-[255px] w-full bg-background border-r flex flex-col'>
      {/* Logo Section */}
      <div className='h-14 px-4 flex items-center border-b'>
        <Link
          href='/portal'
          className='flex items-center gap-2 hover:opacity-80 transition-opacity'
        >
          <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center'>
            <HomeIcon className='w-5 h-5 text-primary-foreground' />
          </div>
          <span className='font-semibold text-lg'>Samurun</span>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className='flex-1 overflow-y-auto py-4'>
        <div className='px-3 space-y-1'>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <Icon className='w-4 h-4 shrink-0' />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Separator className='my-4' />

        <div className='px-3 space-y-1'>
          {settingsNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <Icon className='w-4 h-4 shrink-0' />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className='border-t p-3'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='w-full justify-start gap-3 px-3 h-auto py-2'
            >
              <Avatar className='w-8 h-8'>
                <AvatarImage src='https://github.com/shadcn.png' alt='User' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className='flex-1 text-left overflow-hidden'>
                <p className='text-sm font-medium truncate'>John Doe</p>
                <p className='text-xs text-muted-foreground truncate'>
                  john@example.com
                </p>
              </div>
              <ChevronDownIcon className='w-4 h-4 text-muted-foreground shrink-0' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/portal/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/portal/settings'>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-destructive focus:text-destructive'
              onClick={logoutAction}
            >
              <LogOutIcon className='w-4 h-4 mr-2' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
