import type { Metadata } from 'next';
import './globals.css';
import './rc-image.css';
import { siteConfig } from '@/config/siteConfig';
import Script from 'next/script';
import Providers from '@/components/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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
      className={cn('dark')}
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Providers>
          <main className='flex-1'>{children}</main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
      <Script src='https://strava-embeds.com/embed.js' strategy='lazyOnload' />
    </html>
  );
}
