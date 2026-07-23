import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { CursorGlow } from '@/src/components/cursor-glow';
import { site } from '@/src/content/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.bio[0],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-background antialiased`}
    >
      <body className='relative min-h-full'>
        <CursorGlow />
        <div className='relative z-10'>{children}</div>
      </body>
    </html>
  );
}
