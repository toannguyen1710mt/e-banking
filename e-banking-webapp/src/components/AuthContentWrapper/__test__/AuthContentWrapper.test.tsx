import { render } from '@testing-library/react';

// Components
import AuthContentWrapper from '..';

describe('AuthContentWrapper component', () => {
  it('Should render snapshot correctly.', () => {
    const props = {
      formContent: <>Form</>,
      textHeading: 'Good To See You Again!',
      textFooter: 'Don’t have an account?',
    };

    expect(render(<AuthContentWrapper {...props} />)).toMatchSnapshot();
  });
});
