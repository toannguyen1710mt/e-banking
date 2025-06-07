'use client';

import { usePathname } from 'next/navigation';

// Constants
import { REGEX } from '@/constants';

export const WrapperWorkspaces = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  const isSettingsUrl = REGEX.SETTINGS.test(pathname);

  return (
    <div
      className={`${isSettingsUrl ? 'bg-background-500 p-0' : 'bg-background-900 p-3'} flex grow`}
    >
      {children}
    </div>
  );
};
