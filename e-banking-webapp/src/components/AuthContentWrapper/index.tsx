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
  textFooter?: string;
  textHeading: ReactNode;
  formContent: ReactNode;
  subheading?: string;
}

export const AuthContentWrapper = ({
  textHeading,
  formContent,
  textFooter,
  subheading,
}: AuthContentWrapperProps) => {
  const pathname = usePathname();

  const isOnSignIn = pathname === ROUTES.SIGN_IN;

  const linkDetails = {
    text: isOnSignIn ? 'Register' : 'Sign In',
    href: isOnSignIn ? ROUTES.SIGN_UP : ROUTES.SIGN_IN,
  };

  const classLogo = isOnSignIn
    ? 'mt-0 md:mt-[108px] pb-[56px] md:pb-9'
    : 'pb-[14px] lg:pb-9';
  const classTextHeading = isOnSignIn ? 'mb-7' : 'mb-0 md:mb-7';

  return (
    <div className='mx-auto flex flex-1 flex-col'>
      {/* Logo */}
      <Image
        className={`${classLogo}`}
        src={IMAGES.LOGO}
        width={104}
        height={36}
        alt='Logo EBanking'
      />

      <div className='max-w-[406px] text-center md:text-left'>
        <Text
          as='h1'
          size={TEXT_SIZE['4XL']}
          variant={TEXT_VARIANT.DEFAULT}
          className={`${classTextHeading}`}
        >
          {textHeading}
        </Text>
        <Text
          size={TEXT_SIZE.BASE}
          variant={TEXT_VARIANT.INFO}
          className='mb-4 font-normal leading-[22px]'
        >
          {subheading}
        </Text>
      </div>

      {/* Form */}
      <div className='mx-auto mb-[17px] max-w-[325px] md:mx-0'>
        {formContent}
      </div>

      {textFooter && (
        <Text
          size={TEXT_SIZE.SM}
          variant={TEXT_VARIANT.DEFAULT}
          className='text-center leading-[20px] md:text-left'
        >
          {textFooter}&nbsp;
          <Link
            href={linkDetails.href}
            className='leading-[20px] text-primary-200'
          >
            {linkDetails.text}
          </Link>
        </Text>
      )}
    </div>
  );
};
