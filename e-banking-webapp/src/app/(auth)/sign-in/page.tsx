// Components
import { AuthContentWrapper, HandIcon, LoginForm } from '@/components';

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
