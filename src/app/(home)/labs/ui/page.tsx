import { Metadata } from 'next';
import { ShowcaseWrapper } from './_components/showcase-wrapper';
import { DataTableDemo } from './_components/data-table-demo';
import { AnchorTooltipDemo } from './_components/anchor-tooltip-demo';
import { SegmentedControlDemo } from './_components/segmented-control-demo';
import { readCodeFile } from '@/lib/read-code-file';

export const metadata: Metadata = {
  title: 'Custom UI Components',
  description:
    'Handcrafted UI components built from scratch for specific use cases.',
};

export default function UIShowcasePage() {
  const dataTableDemoCode = readCodeFile(
    'app/(home)/labs/ui/_components/data-table-demo.tsx',
  );
  const dataTableCode = readCodeFile(
    'components/custom-ui/data-table/index.tsx',
  );

  const tooltipDemoCode = readCodeFile(
    'app/(home)/labs/ui/_components/anchor-tooltip-demo.tsx',
  );
  const tooltipCode = readCodeFile('components/custom-ui/tooltip/index.tsx');

  const segmentedControlDemoCode = readCodeFile(
    'app/(home)/labs/ui/_components/segmented-control-demo.tsx',
  );

  const segmentedControlCode = readCodeFile(
    'components/custom-ui/segmented-control/index.tsx',
  );

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>
          Custom UI Components
        </h1>
        <p className='text-muted-foreground text-sm mt-1'>
          Handcrafted UI components built from scratch for specific use cases.
        </p>
      </div>

      <div className='grid gap-6'>
        <ShowcaseWrapper
          title='Data Table'
          description='Advanced data table with sorting, pagination, sticky columns, and row selection. Built on top of TanStack Table with custom styling.'
          files={[
            {
              filename: 'data-table-demo.tsx',
              code: dataTableDemoCode,
              highlightedCode: dataTableDemoCode,
              language: 'tsx',
            },
            {
              filename: 'data-table.tsx',
              code: dataTableCode,
              highlightedCode: dataTableCode,
              language: 'tsx',
            },
          ]}
        >
          <div className='w-full max-w-2xl'>
            <DataTableDemo />
          </div>
        </ShowcaseWrapper>

        <ShowcaseWrapper
          title='Anchor Tooltip'
          description='Native CSS anchor positioning tooltip. No JavaScript calculations needed for positioning. Uses the experimental anchor-name and position-anchor CSS properties.'
          files={[
            {
              filename: 'TootipDemo.tsx',
              code: tooltipDemoCode,
              highlightedCode: tooltipDemoCode,
            },
            {
              filename: 'Tooltip.tsx',
              code: tooltipCode,
              highlightedCode: tooltipCode,
            },
          ]}
        >
          <AnchorTooltipDemo />
        </ShowcaseWrapper>

        <ShowcaseWrapper
          title='Segmented Control'
          description='Animated segmented control with keyboard navigation. Uses CSS anchor positioning for smooth sliding indicator animation.'
          files={[
            {
              filename: 'SegmentedControlDemo.tsx',
              code: segmentedControlDemoCode,
              highlightedCode: segmentedControlDemoCode,
            },
            {
              filename: 'SegmentedControl.tsx',
              code: segmentedControlCode,
              highlightedCode: segmentedControlCode,
            },
          ]}
        >
          <SegmentedControlDemo />
        </ShowcaseWrapper>
      </div>
    </div>
  );
}
