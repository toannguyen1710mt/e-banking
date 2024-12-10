import { NavbarContent, Navbar as NavbarNextUI } from '@nextui-org/react';
import { NavbarItem } from '@/constants';
import { Navbar } from '@/components';

export const Header = () => {
  return (
    <NavbarNextUI>
      <NavbarContent className='gap-[59px] font-normal text-transparentBlack'>
        <Navbar navbarItem={NavbarItem} />
      </NavbarContent>
    </NavbarNextUI>
  );
};
