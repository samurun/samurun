export default function ModernCssIllustration() {
  return (
    <svg
      width='600'
      height='400'
      viewBox='0 0 600 400'
      className='w-full h-full'
    >
      <defs>
        <linearGradient id='css-grad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' className='[stop-color:var(--primary)]' stopOpacity='0.2' />
          <stop offset='100%' className='[stop-color:var(--primary)]' stopOpacity='0.02' />
        </linearGradient>
      </defs>

      <g transform='translate(300, 200)'>
        {/* Container query - outer frame */}
        <rect x='-160' y='-90' width='320' height='180' rx='12' fill='none' className='stroke-border' strokeWidth='1' strokeDasharray='6 4' opacity={0.6} />

        {/* Responsive layout blocks */}
        {/* Left column */}
        <rect x='-140' y='-70' width='130' height='140' rx='10' fill='url(#css-grad)' className='stroke-primary' strokeWidth='0.8' opacity={0.8} />
        <line x1='-125' y1='-50' x2='-40' y2='-50' className='stroke-foreground' strokeWidth='2' strokeLinecap='round' opacity={0.5} />
        <line x1='-125' y1='-35' x2='-55' y2='-35' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />
        <line x1='-125' y1='-22' x2='-65' y2='-22' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />
        <line x1='-125' y1='-9' x2='-45' y2='-9' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' opacity={0.6} />
        {/* Image placeholder */}
        <rect x='-125' y='10' width='95' height='50' rx='6' className='fill-muted' opacity={0.4} />
        <circle cx='-78' cy='35' r='10' className='stroke-muted-foreground' strokeWidth='0.8' fill='none' opacity={0.4} />

        {/* Right column - stacked cards */}
        <rect x='10' y='-70' width='140' height='42' rx='8' className='fill-card stroke-border' strokeWidth='0.8' />
        <line x1='24' y1='-55' x2='80' y2='-55' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.4} />
        <line x1='24' y1='-43' x2='60' y2='-43' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />

        <rect x='10' y='-18' width='140' height='42' rx='8' className='fill-card stroke-primary' strokeWidth='0.8' opacity={0.9} />
        <line x1='24' y1='-3' x2='90' y2='-3' className='stroke-primary' strokeWidth='1.5' strokeLinecap='round' opacity={0.6} />
        <line x1='24' y1='9' x2='70' y2='9' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />

        <rect x='10' y='34' width='140' height='42' rx='8' className='fill-card stroke-border' strokeWidth='0.8' />
        <line x1='24' y1='49' x2='75' y2='49' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.4} />
        <line x1='24' y1='61' x2='55' y2='61' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />

        {/* Resize arrow indicators */}
        <line x1='-170' y1='0' x2='-170' y2='-70' className='stroke-muted-foreground' strokeWidth='0.8' strokeLinecap='round' opacity={0.3} />
        <line x1='-170' y1='0' x2='-170' y2='70' className='stroke-muted-foreground' strokeWidth='0.8' strokeLinecap='round' opacity={0.3} />
        <line x1='-174' y1='-65' x2='-170' y2='-70' className='stroke-muted-foreground' strokeWidth='0.8' strokeLinecap='round' opacity={0.3} />
        <line x1='-166' y1='-65' x2='-170' y2='-70' className='stroke-muted-foreground' strokeWidth='0.8' strokeLinecap='round' opacity={0.3} />
      </g>
    </svg>
  );
}
