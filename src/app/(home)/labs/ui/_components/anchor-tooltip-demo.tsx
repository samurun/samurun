import { Tooltip } from '@/components/custom-ui/tooltip';
import { Button } from '@/components/ui/button';

export function AnchorTooltipDemo() {
  return (
    <div className='flex flex-wrap gap-8 justify-center'>
      <Tooltip tooltip='Top Tooltip' side='top'>
        <Button variant='outline'>Hover me (Top)</Button>
      </Tooltip>
      <Tooltip tooltip='Bottom Tooltip' side='bottom'>
        <Button variant='outline'>Hover me (Bottom)</Button>
      </Tooltip>
      <Tooltip tooltip='Right Tooltip' side='right'>
        <Button variant='outline'>Hover me (Right)</Button>
      </Tooltip>
      <Tooltip tooltip='Left Tooltip' side='left'>
        <Button variant='outline'>Hover me (Left)</Button>
      </Tooltip>
    </div>
  );
}
