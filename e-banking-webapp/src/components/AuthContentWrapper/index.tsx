'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Constants
import { IMAGES, ROUTES } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '../common';

interface AuthContentWrapperProps {
  textHeading: string;
  textFooter: string;
  iconHeading?: ReactNode;
  formContent: ReactNode;
}

export const AuthContentWrapper = ({
  textHeading,
  iconHeading,
  formContent,
  textFooter,
}: AuthContentWrapperProps) => {
  const pathname = usePathname();

  const linkDetails = {
    text: pathname === ROUTES.LOGIN ? 'Register' : 'Login',
    href: pathname === ROUTES.LOGIN ? ROUTES.REGISTER : ROUTES.LOGIN,
  };

  return (
    <div className='flex flex-1 flex-col'>
      {/* Logo */}
      <Image
        className='pb-9'
        src={IMAGES.LOGO}
        width={104}
        height={36}
        alt='Logo EBanking'
      />

      <div className='mb-7'>
        <Text as='h1' size={TEXT_SIZE['4XL']} variant={TEXT_VARIANT.DEFAULT}>
          {textHeading}
        </Text>
        {iconHeading && iconHeading}
      </div>

      {/* Form */}
      <div className='mb-[17px]'>{formContent}</div>

      <Text size={TEXT_SIZE.SM} variant={TEXT_VARIANT.DEFAULT}>
        {textFooter}&nbsp;
        <Link href={linkDetails.href} className='text-primary-200'>
          {linkDetails.text}
        </Link>
      </Text>
    </div>
  );
};
