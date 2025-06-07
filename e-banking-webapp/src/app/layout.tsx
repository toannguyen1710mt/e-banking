import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import './globals.css';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Providers
import Providers from '@/providers';

// Utils
import { toastManager } from '@/utils';

// Configs
import { auth } from '@/config/auth';

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
  alternates: {
    canonical: 'https://e-banking-webapp.vercel.app',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let avatar = '';
  try {
    const session = await auth();
    avatar = session?.user.avatar || '';
  } catch (error) {
    toastManager.showToast(
      `${ERROR_MESSAGES.ERROR_GETTING_SESSION} ${error}`,
      'error',
      'top-center',
    );
  }

  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers avatar={avatar}>
          <main className='mx-auto'>
            <div className='h-screen' id='root'>
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
