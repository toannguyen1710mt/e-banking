import { SessionProvider } from 'next-auth/react';

// Configs
import { auth } from '@/config/auth';

// Layouts
import { HeaderAuth, WrapperWorkspaces } from '@/layouts';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className='flex h-full w-full flex-col'>
        <HeaderAuth />
        <WrapperWorkspaces>{children}</WrapperWorkspaces>
      </div>
    </SessionProvider>
  );
}
