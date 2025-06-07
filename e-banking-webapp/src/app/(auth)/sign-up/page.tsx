import { Metadata } from 'next';

// Constants
import {
  DESCRIPTION_SIGN_UP,
  METADATA_ICONS,
  TITLE_SIGN_UP,
  URL_SIGN_UP,
} from '@/constants';

// Components
import { SignUpForm } from '@/components';

export const metadata: Metadata = {
  title: TITLE_SIGN_UP,
  description: DESCRIPTION_SIGN_UP,
  icons: METADATA_ICONS,
  openGraph: {
    title: TITLE_SIGN_UP,
    description: DESCRIPTION_SIGN_UP,
    url: URL_SIGN_UP,
  },
  alternates: {
    canonical: URL_SIGN_UP,
  },
};

const SignUpPage = () => <SignUpForm />;

export default SignUpPage;
