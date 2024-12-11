import { AuthContentWrapper, SignUpForm } from '@/components';

const SignUpPage = () => (
  <AuthContentWrapper
    formContent={<SignUpForm />}
    textHeading='Control  Your Finances, Join Us Today !'
    textFooter='Already have an account?'
  />
);

export default SignUpPage;
