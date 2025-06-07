import { Metadata } from 'next';

// Constants
import {
  DESCRIPTION_SIGN_IN,
  METADATA_ICONS,
  TITLE_SIGN_IN,
  URL_SIGN_IN,
} from '@/constants';

// Components
import { AuthContentWrapper, HandIcon, LoginForm } from '@/components';

export const metadata: Metadata = {
  title: TITLE_SIGN_IN,
  description: DESCRIPTION_SIGN_IN,
  icons: METADATA_ICONS,
  openGraph: {
    title: TITLE_SIGN_IN,
    description: DESCRIPTION_SIGN_IN,
    url: URL_SIGN_IN,
  },
  alternates: {
    canonical: URL_SIGN_IN,
  },
};

const SignInPage = () => {
  const headingContent = (
    <div className='flex flex-col text-center md:text-left'>
      <span className='block leading-[50px]'>Good To</span>
      <div className='flex-col text-center md:flex md:flex-row md:text-left'>
        <span className='mr-4 block leading-[50px]'>See You Again!</span>
        <HandIcon customClass='ml-[50%] -translate-x-1/2 transform md:ml-0 md:translate-x-0 mt-[27px] md:mt-0' />
      </div>
    </div>
  );

  return (
    <AuthContentWrapper
      formContent={<LoginForm />}
      textHeading={headingContent}
      textFooter='Don’t have an account?'
      subheading='Sign in to your account to continue'
    />
  );
};

export default SignInPage;
