// Configs
import { auth } from '@/config/auth';

// Components
import { ContainerTransactions } from '@/components';

export default async function TransactionsPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const session = await auth();

  if (!session) return;

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return <ContainerTransactions session={session} currentPage={currentPage} />;
}
