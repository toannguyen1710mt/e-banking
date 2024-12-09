'use client';

import { useState } from 'react';

// Components
import { Slideshow } from '@/components';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSlideVisible, setIsSlideVisible] = useState(true);

  const handleToggleView = () => {
    setIsSlideVisible(!isSlideVisible);
  };

  const contentClass = isSlideVisible ? 'hidden lg:flex' : 'flex';
  const slideClass = isSlideVisible ? 'flex' : 'hidden lg:flex';

  return (
    <div className='flex h-screen flex-row'>
      <div
        className={`flex flex-1 flex-col px-4 pb-[83px] pt-[27px] transition-all duration-300 md:px-[83px] md:pb-10 md:pt-[87px] ${
          contentClass
        }`}
      >
        {children}
      </div>
      <div
        className={`flex w-full items-center justify-center bg-background-300 px-4 py-[21px] transition-all duration-300 md:px-[37px] md:py-9 lg:w-[50%] ${
          slideClass
        }`}
      >
        <Slideshow onGetStarted={handleToggleView} />
      </div>
    </div>
  );
};
export default AuthLayout;
