import { Suspense } from 'react';

// Components
import { MyTarget } from '@/components/MyTarget';
import { ContainerCreditCard } from '../ContainerCreditCard';
import { SidebarActions } from './SidebarActions';

export const Sidebar = () => (
  <div className='flex flex-col gap-4'>
    <Suspense fallback={<div>Loading...</div>}>
      <ContainerCreditCard />
    </Suspense>

    <SidebarActions />

    <MyTarget />
  </div>
);
