'use client';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider } from 'next-themes';

// Constants
import { THEMES } from '@/constants';

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
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
  );
};

export default Providers;
