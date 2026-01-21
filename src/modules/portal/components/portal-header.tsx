import { SidebarCloseIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function PortalHeader() {
  return (
    <div className='border-b h-14 px-4 flex items-center gap-2'>
      <Button variant='ghost' size='icon'>
        <SidebarCloseIcon />
      </Button>
      Portal
    </div>
  );
}
