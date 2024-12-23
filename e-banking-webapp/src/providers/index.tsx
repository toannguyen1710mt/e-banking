'use client';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider } from 'next-themes';

// Constants
import { THEMES } from '@/constants';

// Components
import { Toast } from '@/components';

// Contexts
import { ToastProvider } from '@/context';

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NextUIProvider>
      <ThemeProvider
        defaultTheme={THEMES.LIGHT}
        enableSystem
        attribute='class'
        themes={[THEMES.LIGHT, THEMES.DARK]}
      >
        <ToastProvider>
          {children}
          <Toast />
        </ToastProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
