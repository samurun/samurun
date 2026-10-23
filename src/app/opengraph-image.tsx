import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/siteConfig';

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 80,
          background: '#0a0a0a',
          color: '#fafafa',
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 32, color: '#a3a3a3', textAlign: 'center' }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    size,
  );
}
