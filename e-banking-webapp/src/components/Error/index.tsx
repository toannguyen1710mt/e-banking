'use client';

import Link from 'next/link';
import Image from 'next/image';

// Constants
import { ROUTES } from '@/constants';

export const Error = () => (
  <div className='container m-auto flex h-full flex-col items-center justify-center p-4'>
    <Image
      src='/images/server-error.webp'
      alt='Server Error'
      width={600}
      height={400}
      className='mb-4'
    />

    <h1 className='mb-2 text-center text-2xl font-bold text-danger-100'>
      Oops! Something went wrong.
    </h1>
    <p className='mb-4 text-center text-base text-gray-500'>
      We encountered an issue while processing your request. Please try again
      later.
    </p>

    <Link
      href={ROUTES.HOME}
      className='mt-5 h-10 w-[168px] rounded-3xl border-transparent bg-primary-100 py-3 text-center text-xs font-semibold text-foreground-200'
      aria-label='Go to Home Page'
    >
      Go to Home Page
    </Link>
  </div>
);
