export default function UiComponentsIllustration() {
  return (
    <svg
      width='600'
      height='400'
      viewBox='0 0 600 400'
      className='w-full h-full'
    >
      <defs>
        <linearGradient id='ui-grad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' className='[stop-color:var(--primary)]' stopOpacity='0.15' />
          <stop offset='100%' className='[stop-color:var(--primary)]' stopOpacity='0.03' />
        </linearGradient>
      </defs>

      <g transform='translate(300, 200)'>
        {/* Background card */}
        <rect x='-140' y='-100' width='280' height='200' rx='16' fill='url(#ui-grad)' className='stroke-border' strokeWidth='1' />

        {/* Top bar */}
        <rect x='-120' y='-80' width='240' height='8' rx='4' className='fill-border' opacity={0.5} />

        {/* Input field */}
        <rect x='-120' y='-55' width='160' height='28' rx='8' fill='none' className='stroke-border' strokeWidth='1' />
        <line x1='-108' y1='-41' x2='-50' y2='-41' className='stroke-muted-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.5} />

        {/* Button (primary) */}
        <rect x='55' y='-55' width='65' height='28' rx='8' className='fill-primary' opacity={0.8} />
        <line x1='68' y1='-41' x2='108' y2='-41' className='stroke-primary-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.9} />

        {/* Toggle row */}
        <rect x='-120' y='-10' width='32' height='18' rx='9' className='fill-primary' opacity={0.7} />
        <circle cx='-97' cy='-1' r='6' className='fill-primary-foreground' opacity={0.9} />
        <line x1='-80' y1='-1' x2='-30' y2='-1' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.4} />

        {/* Toggle row 2 (off) */}
        <rect x='-120' y='18' width='32' height='18' rx='9' fill='none' className='stroke-border' strokeWidth='1' />
        <circle cx='-105' cy='27' r='6' className='fill-muted-foreground' opacity={0.3} />
        <line x1='-80' y1='27' x2='-20' y2='27' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.3} />

        {/* Checkbox group */}
        <rect x='20' y='-10' width='16' height='16' rx='4' className='fill-primary' opacity={0.8} />
        <path d='M24 -3 L27 0 L32 -5' fill='none' className='stroke-primary-foreground' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' opacity={0.9} />
        <line x1='44' y1='-2' x2='100' y2='-2' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.4} />

        <rect x='20' y='14' width='16' height='16' rx='4' fill='none' className='stroke-border' strokeWidth='1' />
        <line x1='44' y1='22' x2='90' y2='22' className='stroke-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.3} />

        {/* Bottom action bar */}
        <line x1='-120' y1='55' x2='120' y2='55' className='stroke-border' strokeWidth='0.5' />
        <rect x='-120' y='65' width='50' height='22' rx='6' fill='none' className='stroke-border' strokeWidth='1' />
        <line x1='-108' y1='76' x2='-82' y2='76' className='stroke-muted-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.5} />
        <rect x='50' y='65' width='70' height='22' rx='6' className='fill-primary' opacity={0.6} />
        <line x1='62' y1='76' x2='108' y2='76' className='stroke-primary-foreground' strokeWidth='1.5' strokeLinecap='round' opacity={0.8} />
      </g>
    </svg>
  );
}
