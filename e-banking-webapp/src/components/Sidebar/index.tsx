'use client';

// Libs
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

// Components
import { Button } from '@/components';

interface ISidebar {
  sidebarItem: { label: string; href: string; icon: ReactNode }[];
}

export const Sidebar = ({ sidebarItem }: ISidebar) => {
  const pathname = usePathname();

  return (
    <aside className='h-screen w-[195px] border-r-1 border-semiTransparentDimGray px-[14px] pt-6'>
      {sidebarItem.map(({ label, href, icon }) => {
        const buttonColor = pathname === href ? 'overlay' : 'outline';

        return (
          <Link key={label} href={href}>
            <Button
              className='text-black'
              color={buttonColor}
              radius='lg'
              startContent={icon}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </aside>
  );
};
