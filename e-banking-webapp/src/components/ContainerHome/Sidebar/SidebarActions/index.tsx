'use client';

// Components
import { QuickAction, DailyLimit } from '@/components';

export const SidebarActions = () => (
  <>
    <QuickAction />
    <DailyLimit expenses='50,000' limit='183,450' />
  </>
);
