export default function EchartIllustration() {
  return (
    <svg
      width='600'
      height='400'
      viewBox='0 0 600 400'
      className='w-full h-full'
    >
      <defs>
        <linearGradient id='chart-grad' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' className='[stop-color:var(--primary)]' stopOpacity='0.3' />
          <stop offset='100%' className='[stop-color:var(--primary)]' stopOpacity='0.02' />
        </linearGradient>
      </defs>

      <g transform='translate(300, 210)'>
        {/* X axis */}
        <line x1='-160' y1='70' x2='160' y2='70' className='stroke-border' strokeWidth='1' />
        {/* Y axis */}
        <line x1='-160' y1='-90' x2='-160' y2='70' className='stroke-border' strokeWidth='1' />

        {/* Grid lines */}
        <line x1='-160' y1='30' x2='160' y2='30' className='stroke-border' strokeWidth='0.5' opacity={0.3} />
        <line x1='-160' y1='-10' x2='160' y2='-10' className='stroke-border' strokeWidth='0.5' opacity={0.3} />
        <line x1='-160' y1='-50' x2='160' y2='-50' className='stroke-border' strokeWidth='0.5' opacity={0.3} />

        {/* Area fill under line */}
        <path
          d='M-130 40 L-80 10 L-30 -20 L20 -55 L70 -30 L120 -65 L120 70 L-130 70 Z'
          fill='url(#chart-grad)'
        />

        {/* Line chart */}
        <path
          d='M-130 40 L-80 10 L-30 -20 L20 -55 L70 -30 L120 -65'
          fill='none'
          className='stroke-primary'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        {/* Data points */}
        <circle cx='-130' cy='40' r='4' className='fill-primary' opacity={0.8} />
        <circle cx='-80' cy='10' r='4' className='fill-primary' opacity={0.8} />
        <circle cx='-30' cy='-20' r='4' className='fill-primary' opacity={0.8} />
        <circle cx='20' cy='-55' r='4' className='fill-primary' />
        <circle cx='70' cy='-30' r='4' className='fill-primary' opacity={0.8} />
        <circle cx='120' cy='-65' r='4' className='fill-primary' />

        {/* Highlight point with ring */}
        <circle cx='20' cy='-55' r='8' fill='none' className='stroke-primary' strokeWidth='1' opacity={0.3} />

        {/* Tooltip */}
        <rect x='5' y='-90' width='56' height='26' rx='6' className='fill-card stroke-border' strokeWidth='0.8' />
        <line x1='18' y1='-81' x2='48' y2='-81' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.5} />
        <line x1='18' y1='-72' x2='38' y2='-72' className='stroke-primary' strokeWidth='1.5' strokeLinecap='round' opacity={0.7} />

        {/* Bar chart (secondary) */}
        <rect x='-130' y='45' width='16' height='25' rx='3' className='fill-primary' opacity={0.15} />
        <rect x='-100' y='35' width='16' height='35' rx='3' className='fill-primary' opacity={0.2} />
        <rect x='-70' y='25' width='16' height='45' rx='3' className='fill-primary' opacity={0.15} />
        <rect x='-40' y='40' width='16' height='30' rx='3' className='fill-primary' opacity={0.2} />
        <rect x='-10' y='20' width='16' height='50' rx='3' className='fill-primary' opacity={0.15} />

        {/* X axis labels */}
        <text x='-130' y='88' className='fill-muted-foreground' fontSize='8' textAnchor='middle' opacity={0.4}>Mon</text>
        <text x='-80' y='88' className='fill-muted-foreground' fontSize='8' textAnchor='middle' opacity={0.4}>Tue</text>
        <text x='-30' y='88' className='fill-muted-foreground' fontSize='8' textAnchor='middle' opacity={0.4}>Wed</text>
        <text x='20' y='88' className='fill-muted-foreground' fontSize='8' textAnchor='middle' opacity={0.4}>Thu</text>
        <text x='70' y='88' className='fill-muted-foreground' fontSize='8' textAnchor='middle' opacity={0.4}>Fri</text>
        <text x='120' y='88' className='fill-muted-foreground' fontSize='8' textAnchor='middle' opacity={0.4}>Sat</text>
      </g>
    </svg>
  );
}
