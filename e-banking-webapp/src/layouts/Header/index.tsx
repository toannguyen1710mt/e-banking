'use client';

// Libs
import {
  Avatar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Navbar as NavbarNextUI,
  Spinner,
} from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import { redirect, usePathname } from 'next/navigation';

// Constants
import { ERROR_MESSAGES, IMAGES, NavbarList, REGEX, ROUTES } from '@/constants';

// Components
import {
  Button,
  MenuDropdown,
  Navbar,
  NotificationIcon,
  SearchIcon,
  SettingIcon,
  SignOutIcon,
} from '@/components';

// Actions
import { signOut } from '@/actions';

// Contexts
import { useToastContext, useUserContext } from '@/context';

interface IHeaderProps {
  session: Session;
}

export const Header = ({ session }: IHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { showToast } = useToastContext();
  const pathname = usePathname();

  const { avatar } = useUserContext();

  const isSettingsUrl = REGEX.SETTINGS.test(pathname);

  const {
    user: { username, email },
  } = session;

  const mobileMenuOptions = [
    ...NavbarList.map((item) => ({
      key: item.path,
      label: item.text,
    })),
  ];

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut();

      showToast(ERROR_MESSAGES.SIGN_OUT_SUCCESS, 'success', 'top-center');
    } catch (error) {
      console.error(error);

      showToast(ERROR_MESSAGES.SIGN_OUT_FAILED, 'error', 'top-center');
    } finally {
      setIsSigningOut(false);

      redirect(ROUTES.SIGN_IN);
    }
  };

  const dropDownMenuOptions = [
    {
      key: username,
      label: '',
      customOptionElement: (
        <div className='flex flex-col gap-2'>
          <span className='text-xs font-semibold'>{username}</span>
          <span className='text-3xs font-semibold text-transparentBlack'>
            {email}
          </span>
        </div>
      ),
    },
    {
      key: 'Settings',
      label: 'Settings',
      startContent: <SettingIcon />,
      customOptionElement: <Link href={ROUTES.GENERAL}>Settings</Link>,
    },
    {
      key: 'Sign Out',
      label: 'Sign Out',
      customOptionElement: (
        <Button
          startContent={!isSigningOut && <SignOutIcon />}
          spinner={<Spinner size='sm' />}
          isLoading={isSigningOut}
          isDisabled={isSigningOut}
          onClick={handleSignOut}
          className='flex h-full !max-h-none min-w-0 justify-start gap-2 !bg-transparent p-0 text-foreground-100'
        >
          Sign out
        </Button>
      ),
    },
  ];

  return (
    <NavbarNextUI
      classNames={{
        wrapper: `max-w-full justify-start border-b border-foreground-100 border-opacity-25 px-3 ${isSettingsUrl ? 'bg-background-500' : 'bg-background-900'}`,
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className='flex items-center gap-[88px]'>
        <NavbarBrand className='gap-5'>
          <MenuDropdown
            options={mobileMenuOptions}
            customTriggerElement={
              <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className='hidden max-[700px]:flex'
              />
            }
            isDivided={true}
          />
          <Link href={ROUTES.HOME}>
            <Image
              src={IMAGES.LOGO}
              alt='Logo EBanking'
              width={104}
              height={36}
              priority
            />
          </Link>
        </NavbarBrand>
        <NavbarContent
          className='flex gap-[59px] font-normal text-transparentBlack max-[700px]:hidden'
          data-justify='center'
        >
          <Navbar navbarItem={NavbarList} />
        </NavbarContent>
      </div>
      <NavbarContent data-justify='end'>
        <li className='flex justify-end gap-4'>
          <button
            aria-label='search icon'
            disabled={true}
            className='cursor-not-allowed'
          >
            <SearchIcon />
          </button>
          <button
            aria-label='notification icon'
            disabled={true}
            className='cursor-not-allowed'
          >
            <NotificationIcon />
          </button>
          <MenuDropdown
            customTriggerElement={
              <Avatar
                role={'button'}
                src={avatar}
                className='h-6 w-6 rounded-full'
              />
            }
            options={dropDownMenuOptions}
            isDivided={true}
          />
        </li>
      </NavbarContent>
    </NavbarNextUI>
  );
};
