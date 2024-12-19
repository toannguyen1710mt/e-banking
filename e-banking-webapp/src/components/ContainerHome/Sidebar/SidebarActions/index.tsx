// Auth config
import { auth } from '@/config/auth';

// Components
import { QuickAction, DailyLimit } from '@/components';

export const SidebarActions = async () => {
  const session = await auth();

  if (!session) return;

  return (
    <>
      <QuickAction session={session} />
      <DailyLimit expenses='50,000' limit='183,450' />
    </>
  );
};
