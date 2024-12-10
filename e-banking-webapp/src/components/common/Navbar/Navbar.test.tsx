// Libs
import { render } from '@testing-library/react';
import { NavbarContent, Navbar as NavbarNextUI } from '@nextui-org/react';
import '@testing-library/jest-dom';

// Constants
import { NavbarItem } from '@/constants';

// Components
import { Navbar } from '.';

describe('Navbar component', () => {
  test('renders with default type', () => {
    const { container } = render(
      <NavbarNextUI>
        <NavbarContent className='gap-[59px] font-normal text-transparentBlack'>
          <Navbar navbarItem={NavbarItem} />
        </NavbarContent>
      </NavbarNextUI>,
    );
    expect(container).toMatchSnapshot();
  });
});
