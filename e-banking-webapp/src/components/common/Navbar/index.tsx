'use client';

import { NavbarItem as NavbarItemNextUI } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface INavbar {
  navbarItem: { text: string; path: string }[];
}
export const Navbar = ({ navbarItem }: INavbar) => {
  const pathname = usePathname();

  return (
    <>
      {navbarItem.map(({ text, path }) => {
        const isActive = pathname === path;
        return (
          <NavbarItemNextUI key={text}>
            <Link
              href={path}
              className={`${
                isActive ? 'font-bold text-black' : 'text-gray-500'
              }`}
            >
              {text}
            </Link>
          </NavbarItemNextUI>
        );
      })}
    </>
  );
};
