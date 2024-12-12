'use client';

import Link from 'next/link';
import Image from 'next/image';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Text } from '@/components';

export const SuccessNotify = () => (
  <div className='flex w-full flex-col gap-4 bg-white'>
    <Image
      src={'/images/logo.webp'}
      width={328}
      height={312}
      alt='Illustration of a successful sign-up'
      className='md:hidden'
    />
    <Text
      size={TEXT_SIZE.SM}
      variant={TEXT_VARIANT.INFO}
      className='mb-10 font-normal'
    >
      Head back to login page to access your account
    </Text>

    <Link
      href={ROUTES.SIGN_IN}
      className='max-h-10 w-full rounded-3xl border-transparent bg-background-300 py-2.5 text-center text-sm text-foreground-200'
    >
      Finished
    </Link>
  </div>
);
