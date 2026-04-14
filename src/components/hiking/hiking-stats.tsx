import { MountainIcon, FootprintsIcon, FlagIcon, MapPinIcon } from 'lucide-react';

interface HikingStatsProps {
  totalTrips: number;
  totalSummits: number;
  totalElevation: number;
  totalDistance: number;
  countries: number;
}

export default function HikingStats({
  totalTrips,
  totalSummits,
  totalElevation,
  totalDistance,
  countries,
}: HikingStatsProps) {
  const everestMultiplier = (totalElevation / 8849).toFixed(1);

  const tiles = [
    {
      icon: <MapPinIcon size={14} />,
      value: totalTrips.toString(),
      label: 'Trips',
    },
    {
      icon: <MountainIcon size={14} />,
      value: totalSummits.toString(),
      label: 'Summits',
    },
    {
      icon: <FootprintsIcon size={14} />,
      value:
        totalElevation > 0
          ? `${totalElevation.toLocaleString()}m`
          : '—',
      label: 'Tracked Elevation',
    },
    {
      icon: <FlagIcon size={14} />,
      value: countries.toString(),
      label: 'Countries',
    },
  ];

  return (
    <div className='mb-8'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className='rounded-xl border border-border/50 bg-card p-4 flex flex-col gap-1'
          >
            <span className='text-xs text-muted-foreground flex items-center gap-1.5'>
              {tile.icon}
              {tile.label}
            </span>
            <span className='text-2xl font-semibold tracking-tight'>
              {tile.value}
            </span>
          </div>
        ))}
      </div>
      {totalElevation > 0 && (
        <p className='text-xs text-muted-foreground mt-3'>
          That&apos;s {everestMultiplier}× Mt. Everest climbed across tracked
          ascents · {totalDistance.toFixed(1)} km on foot
        </p>
      )}
    </div>
  );
}
