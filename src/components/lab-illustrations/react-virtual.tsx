export default function ReactVirtualIllustration() {
  return (
    <svg
      width='600'
      height='400'
      viewBox='0 0 600 400'
      className='w-full h-full'
    >
      <defs>
        <linearGradient id='virt-fade-top' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' className='[stop-color:var(--background)]' stopOpacity='1' />
          <stop offset='100%' className='[stop-color:var(--background)]' stopOpacity='0' />
        </linearGradient>
        <linearGradient id='virt-fade-bottom' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' className='[stop-color:var(--background)]' stopOpacity='0' />
          <stop offset='100%' className='[stop-color:var(--background)]' stopOpacity='1' />
        </linearGradient>
      </defs>

      <g transform='translate(300, 200)'>
        {/* Ghost items above (fading out) */}
        <g opacity={0.15}>
          <rect x='-110' y='-150' width='220' height='32' rx='8' fill='none' className='stroke-border' strokeWidth='0.8' />
          <line x1='-90' y1='-134' x2='-40' y2='-134' className='stroke-muted-foreground' strokeWidth='1.5' strokeLinecap='round' />
        </g>
        <g opacity={0.3}>
          <rect x='-110' y='-110' width='220' height='32' rx='8' fill='none' className='stroke-border' strokeWidth='0.8' />
          <line x1='-90' y1='-94' x2='-30' y2='-94' className='stroke-muted-foreground' strokeWidth='1.5' strokeLinecap='round' />
          <line x1='-20' y1='-94' x2='40' y2='-94' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />
        </g>

        {/* Visible viewport bracket */}
        <rect x='-120' y='-68' width='240' height='136' rx='12' fill='none' className='stroke-primary' strokeWidth='1' opacity={0.3} />

        {/* Rendered items */}
        <rect x='-110' y='-60' width='220' height='32' rx='8' className='fill-card stroke-border' strokeWidth='0.8' />
        <line x1='-90' y1='-44' x2='-30' y2='-44' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.5} />
        <line x1='-20' y1='-44' x2='50' y2='-44' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />
        <circle cx='90' cy='-44' r='6' fill='none' className='stroke-border' strokeWidth='0.8' />

        {/* Active/selected item */}
        <rect x='-110' y='-20' width='220' height='32' rx='8' className='fill-primary stroke-primary' strokeWidth='0.8' opacity={0.12} />
        <rect x='-110' y='-20' width='220' height='32' rx='8' fill='none' className='stroke-primary' strokeWidth='1' opacity={0.4} />
        <line x1='-90' y1='-4' x2='-20' y2='-4' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.6} />
        <line x1='-10' y1='-4' x2='40' y2='-4' className='stroke-primary' strokeWidth='1.5' strokeLinecap='round' opacity={0.5} />
        <rect x='80' y='-10' width='18' height='12' rx='4' className='fill-primary' opacity={0.6} />

        <rect x='-110' y='20' width='220' height='32' rx='8' className='fill-card stroke-border' strokeWidth='0.8' />
        <line x1='-90' y1='36' x2='-40' y2='36' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.5} />
        <line x1='-30' y1='36' x2='30' y2='36' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />
        <circle cx='90' cy='36' r='6' fill='none' className='stroke-border' strokeWidth='0.8' />

        {/* Ghost items below (fading out) */}
        <g opacity={0.3}>
          <rect x='-110' y='78' width='220' height='32' rx='8' fill='none' className='stroke-border' strokeWidth='0.8' />
          <line x1='-90' y1='94' x2='-35' y2='94' className='stroke-muted-foreground' strokeWidth='1.5' strokeLinecap='round' />
          <line x1='-25' y1='94' x2='30' y2='94' className='stroke-border' strokeWidth='1.5' strokeLinecap='round' />
        </g>
        <g opacity={0.15}>
          <rect x='-110' y='118' width='220' height='32' rx='8' fill='none' className='stroke-border' strokeWidth='0.8' />
          <line x1='-90' y1='134' x2='-50' y2='134' className='stroke-muted-foreground' strokeWidth='1.5' strokeLinecap='round' />
        </g>

        {/* Scrollbar */}
        <rect x='125' y='-60' width='4' height='120' rx='2' className='fill-border' opacity={0.4} />
        <rect x='125' y='-20' width='4' height='35' rx='2' className='fill-primary' opacity={0.5} />

        {/* Label */}
        <text x='125' y='-75' className='fill-muted-foreground' fontSize='7' textAnchor='end' opacity={0.3}>3 of 1,000</text>
      </g>
    </svg>
  );
}
