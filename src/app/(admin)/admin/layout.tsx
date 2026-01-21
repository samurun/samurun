import PortalHeader from '@/modules/portal/components/portal-header';
import PortalSidebar from '@/modules/portal/components/portal-sidebar';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen'>
      <PortalSidebar />
      <div className='flex flex-col flex-1'>
        <PortalHeader />
        <div className='flex flex-1 p-4'>{children}</div>
      </div>
    </div>
  );
}
