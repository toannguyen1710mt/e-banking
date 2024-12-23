// Configs
import { auth } from '@/config/auth';

// Layouts
import { Header } from '@/layouts';

export const HeaderAuth = async () => {
  const session = await auth();

  if (!session) return;

  return <Header session={session} />;
};
