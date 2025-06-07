import { SessionProvider } from 'next-auth/react';

// Configs
import { auth } from '@/config/auth';

// Layouts
import { Header, WrapperWorkspaces } from '@/layouts';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return null;
  }

  const {
    user: { username, email },
  } = session;

  return (
    <SessionProvider session={session}>
      <div className='flex h-full w-full flex-col'>
        {session && <Header username={username} email={email} />}
        <WrapperWorkspaces>{children}</WrapperWorkspaces>
      </div>
    </SessionProvider>
  );
}
