import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import './globals.css';

// Providers
import Providers from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Banking',
  description: 'Showcase of E-Banking application',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
  openGraph: {
    title: 'E-Banking',
    description: 'Showcase of E-Banking application',
    images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers>
          <main className='mx-auto'>
            <div className='h-screen'>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
