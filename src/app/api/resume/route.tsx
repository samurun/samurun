import { renderToBuffer } from '@react-pdf/renderer';

import { ResumeDocument } from '@/components/resume-pdf/ResumeDocument';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const FILENAME = 'fadlan-jehteerokee-resume.pdf';

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${FILENAME}"`,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
