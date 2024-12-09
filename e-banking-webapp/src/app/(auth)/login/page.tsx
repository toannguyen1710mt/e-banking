import { AuthContentWrapper } from '@/components';

const LoginPage = () => (
  <AuthContentWrapper
    // TODO: Will update Form later
    formContent={<>Form</>}
    textHeading='Good To See You Again!'
    textFooter='Don’t have an account?'
  />
);

export default LoginPage;
