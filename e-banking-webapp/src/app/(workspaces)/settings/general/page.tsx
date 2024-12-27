import { getUser } from '@/actions';

// Configs
import { auth } from '@/config/auth';

// Interfaces
import { IUser } from '@/interfaces';

// Components
import { General } from '@/components';

export default async function GeneralPage() {
  const session = await auth();

  const user = await getUser(session?.user.id as number);

  return <General user={user as IUser} />;
}
