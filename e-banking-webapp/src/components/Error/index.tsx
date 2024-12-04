'use client';

import Link from 'next/link';

// Constants
import { ERROR_MESSAGE, ROUTES } from '@/constants';

type ErrorProps = {
  message?: string;
  className?: string;
};

export const Error = ({ message = ERROR_MESSAGE.DEFAULT }: ErrorProps) => (
  <div className='container m-auto flex h-full max-w-lg flex-col items-center justify-center p-8'>
    <h1 className='mb-4 text-2xl font-bold text-danger-100'>Oops! {message}</h1>

    <Link
      href={ROUTES.HOME}
      className='pt-5 text-lg text-primary-200 hover:underline'
      aria-label='Go to Home Page'
    >
      Go to Home Page
    </Link>
  </div>
);
