import { Card, CardContent } from './ui/card';

export default function MonthlyActivities() {
  return (
    <section className='py-20 border-t border-white/10'>
      <div className='container mx-auto max-w-4xl'>
        <h2 className='text-2xl font-bold mb-8'>This November</h2>
        <div className='grid grid-cols-3 gap-6'>
          <Card className='bg-white/5 border-white/10'>
            <CardContent className='p-6 text-center'>
              <div className='text-3xl font-bold'>1</div>
              <div className='text-sm text-gray-400'>Total Activities</div>
            </CardContent>
          </Card>
          <Card className='bg-white/5 border-white/10'>
            <CardContent className='p-6 text-center'>
              <div className='text-3xl font-bold'>1h 22m</div>
              <div className='text-sm text-gray-400'>Total Time</div>
            </CardContent>
          </Card>
          <Card className='bg-white/5 border-white/10'>
            <CardContent className='p-6 text-center'>
              <div className='text-3xl font-bold'>0 km</div>
              <div className='text-sm text-gray-400'>Total Distance</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
