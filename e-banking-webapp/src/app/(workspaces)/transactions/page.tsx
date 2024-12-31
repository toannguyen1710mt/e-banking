// Configs
import { auth } from '@/config/auth';

// Components
import { ContainerTransactions } from '@/components';

export default async function TransactionsPage() {
  const session = await auth();

  if (!session) return;

  return <ContainerTransactions session={session} />;
}
