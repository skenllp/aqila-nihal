import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const edwardianScript = localFont({
  src: [
    {
      path: '../public/fonts/EdwardianScriptITC.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/EdwardianScriptITC.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/EdwardianScriptITC.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-edwardian',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aqila-nihal.vercel.app'),
  title: 'Aqila & Nihal · Wedding Invitation · 14 November 2026',
  description: 'Join us as we celebrate the Nikkah of Adv. Aqila Sherin & Adv. Nihal Bin Noushad on November 14, 2026 at Town Bank Auditorium, Thalassery.',
  icons: { icon: '/assets/logo-2.png' },
  openGraph: {
    title: 'Aqila & Nihal · Wedding Invitation',
    description: 'Nikkah · 14 November 2026 · Town Bank Auditorium, Thalassery',
    url: 'https://aqila-nihal.vercel.app',
    siteName: 'Aqila & Nihal Wedding',
    images: [{ url: 'https://aqila-nihal.vercel.app/og.jpg', width: 1200, height: 630, alt: 'Aqila & Nihal Wedding Invitation' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqila & Nihal · Wedding Invitation',
    description: 'Nikkah · 14 November 2026 · Town Bank Auditorium, Thalassery',
    images: ['https://aqila-nihal.vercel.app/og.jpg'],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={edwardianScript.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Sedan:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
