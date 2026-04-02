import { readCodeFile } from '@/lib/read-code-file';
import { ShowcaseWrapper } from '../ui/_components/showcase-wrapper';
import { HighlightAPI } from './_components/highlight-api';
import { Carousel } from './_components/carousel';

export default function Page() {
  const highlightAPICode = readCodeFile(
    'app/(home)/labs/modern-css/_components/highlight-api.tsx',
  );

  const carouselCode = readCodeFile(
    'app/(home)/labs/modern-css/_components/carousel.tsx',
  );
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>
          Modern CSS Features Showcase
        </h1>
        <p className='text-muted-foreground text-sm mt-1'>
          A collection of demos showcasing modern CSS features and techniques,
        </p>
      </div>
      <div>
        <ShowcaseWrapper
          title='The CSS Custom Highlight API lets you highlight search results'
          description='The CSS Custom Highlight API allows developers to create custom highlights on web pages, such as highlighting search results or specific elements. This lab demonstrates how to use the API to implement a search result highlighting feature.'
          files={[
            {
              filename: 'highlight-api.tsx',
              code: highlightAPICode,
              highlightedCode: highlightAPICode,
              language: 'tsx',
            },
          ]}
        >
          <HighlightAPI />
        </ShowcaseWrapper>
        <ShowcaseWrapper
          title='Carousel Component'
          description='This lab demonstrates how to create a simple carousel component using modern CSS techniques.'
          files={[
            {
              filename: 'carousel.tsx',
              code: carouselCode,
              highlightedCode: carouselCode,
              language: 'tsx',
            },
          ]}
        >
          <Carousel />
        </ShowcaseWrapper>
      </div>
    </div>
  );
}
