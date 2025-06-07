// Configs
import { auth } from '@/config/auth';

// Components
import { ContainerAnalytics } from '@/components';

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session) return;

  return <ContainerAnalytics session={session} />;
}
