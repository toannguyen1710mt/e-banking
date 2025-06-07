'use client';

import { Spinner } from '@nextui-org/react';

export const LoadingIndicator = () => (
  <div className='flex h-full w-full items-center justify-center text-center'>
    <Spinner color='success' size='lg' />
  </div>
);
