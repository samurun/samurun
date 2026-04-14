import { hikings } from '@/data/hikings';
import HikingItem from '@/components/hiking/hiking-item';
import HikingStats from '@/components/hiking/hiking-stats';
import { getHikingActivities } from '@/lib/strava';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata = {
  title: 'Hiking',
  description: 'My hiking adventures',
};

const isMatch = (activityDate: string, startDate: string, endDate?: string) => {
  const act = new Date(activityDate).getTime();
  const start = new Date(startDate).getTime();
  const end = endDate ? new Date(endDate).getTime() : new Date().getTime();

  return act >= start && act <= end + 86400000;
};

const MYANMAR_KEYWORDS = ['พม่า', 'เมียวดี'];

export default async function Page() {
  const stravaActivities = await getHikingActivities(100);

  const sorted = [...hikings].sort(
    (a, b) =>
      new Date(b.hikes[0].startDate).getTime() -
      new Date(a.hikes[0].startDate).getTime(),
  );

  const enriched = sorted.map((item) => {
    const matchedActivity = stravaActivities.find((act) =>
      item.hikes.some((hike) =>
        isMatch(act.startDate, hike.startDate, hike.endDate),
      ),
    );
    return { item, matchedActivity };
  });

  const totalTrips = hikings.length;
  const totalSummits = hikings.reduce((sum, h) => sum + h.hikes.length, 0);
  const totalElevation = enriched.reduce(
    (sum, { matchedActivity }) =>
      sum + (matchedActivity?.totalElevationGain ?? 0),
    0,
  );
  const totalDistance = enriched.reduce(
    (sum, { matchedActivity }) =>
      sum + parseFloat(matchedActivity?.distance ?? '0'),
    0,
  );
  const countries = hikings.some((h) =>
    MYANMAR_KEYWORDS.some((kw) => h.title.includes(kw)),
  )
    ? 2
    : 1;

  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-8'>
          <h1 className='text-lg font-semibold tracking-tight'>Hiking Trips</h1>
        </div>

        <HikingStats
          totalTrips={totalTrips}
          totalSummits={totalSummits}
          totalElevation={Math.round(totalElevation)}
          totalDistance={totalDistance}
          countries={countries}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4 grid-flow-dense'>
          {enriched.map(({ item, matchedActivity }, idx) => {
            const isRepeat = item.hikes.length > 1;
            return (
              <HikingItem
                key={`${item.title}-${idx}`}
                item={item}
                stravaActivity={matchedActivity}
                wide={isRepeat}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
