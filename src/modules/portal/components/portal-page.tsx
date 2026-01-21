import { Card } from '@/components/ui/card';

export default function PortalPage() {
  return (
    <div className='w-full space-y-4'>
      <div className='flex gap-4'>
        {new Array(3).fill(0).map((_, index) => (
          <Card key={index} className='w-1/3 bg-border h-32' />
        ))}
      </div>
      <Card className='w-full bg-border h-96' />
    </div>
  );
}
