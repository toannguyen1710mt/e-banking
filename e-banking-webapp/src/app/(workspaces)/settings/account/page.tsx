// Components
import { Account } from '@/components';

// Configs
import { auth } from '@/config/auth';

export default async function AccountPage() {
  const session = await auth();

  if (!session) return;

  return <Account session={session} />;
}
