'use client';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider } from 'next-themes';

// Constants
import { THEMES } from '@/constants';

// Components
import { Toast } from '@/components';

// Contexts
import { ToastProvider } from '@/context';
import { UserProvider } from '@/context/useUser';

interface IProvidersProps {
  children: React.ReactNode;
  avatar: string;
}

const Providers = ({ children, avatar }: IProvidersProps) => {
  return (
    <NextUIProvider>
      <ThemeProvider
        defaultTheme={THEMES.LIGHT}
        enableSystem
        attribute='class'
        themes={[THEMES.LIGHT, THEMES.DARK]}
      >
        <UserProvider avatar={avatar}>
          <ToastProvider>
            {children}
            <Toast />
          </ToastProvider>
        </UserProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
