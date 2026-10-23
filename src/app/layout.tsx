import type { Metadata } from 'next';
import './globals.css';
import './rc-image.css';
import { siteConfig } from '@/config/siteConfig';
import Script from 'next/script';
import Providers from '@/components/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

// LINE Seed Sans TH (https://seed.line.me) — covers both Thai and Latin
const lineSeed = localFont({
  src: [
    { path: './fonts/LINESeedSansTH_W_Th.woff2', weight: '100', style: 'normal' },
    { path: './fonts/LINESeedSansTH_W_Rg.woff2', weight: '400', style: 'normal' },
    { path: './fonts/LINESeedSansTH_W_Bd.woff2', weight: '700', style: 'normal' },
    { path: './fonts/LINESeedSansTH_W_XBd.woff2', weight: '800', style: 'normal' },
    { path: './fonts/LINESeedSansTH_W_He.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-line-seed',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn('dark', lineSeed.variable)}
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body
        className={`font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Providers>
          <main className='flex-1'>{children}</main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
      <Script src='https://strava-embeds.com/embed.js' strategy='lazyOnload' />
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
