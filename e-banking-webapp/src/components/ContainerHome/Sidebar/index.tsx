import { Suspense } from 'react';

// Components
import { MyTarget } from '@/components/MyTarget';
import { ContainerCreditCard } from '../ContainerCreditCard';
import { SidebarActions } from './SidebarActions';
import { CreditCardSkeleton } from '@/components/Skeletons';

export const Sidebar = () => (
  <div className='flex flex-col gap-4'>
    <div className='flex flex-col gap-4 sm:flex-row xl:flex-col'>
      <Suspense fallback={<CreditCardSkeleton />}>
        <ContainerCreditCard />
      </Suspense>

      <SidebarActions />
    </div>

    <MyTarget />
  </div>
);
