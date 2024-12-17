'use client';

// Constants
import { QUICK_ACTIONS } from '@/constants';

// Components
import { QuickAction, DailyLimit } from '@/components';

export const SidebarActions = () => (
  <>
    <QuickAction actions={QUICK_ACTIONS} />
    <DailyLimit expenses='50,000' limit='183,450' />
  </>
);
