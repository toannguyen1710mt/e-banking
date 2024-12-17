'use client';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

// Constants
import { THEMES } from '@/constants';

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ThemeProvider
          defaultTheme={THEMES.LIGHT}
          enableSystem
          attribute='class'
          themes={[THEMES.LIGHT, THEMES.DARK]}
        >
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
