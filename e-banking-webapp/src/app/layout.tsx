import type { Metadata } from 'next';
import { NavbarContent, Navbar as NavbarNextUI } from '@nextui-org/react';

import { Inter } from 'next/font/google';

import { NavbarItem } from '@/mocks';

// Providers
import Providers from '@/providers';

import { Navbar } from '@/components';

import './globals.css';

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
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <NavbarNextUI>
            <NavbarContent className='gap-[59px] font-normal text-transparentBlack'>
              <Navbar navbarItem={NavbarItem} />
            </NavbarContent>
          </NavbarNextUI>
          <main className='mx-auto'>
            <div>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
