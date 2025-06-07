import { act, fireEvent, render, waitFor } from '@testing-library/react';

// Services
import { getUserById } from '@/services';

// Actions
import { updateEmailSettings } from '@/actions';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Utils
import { toastManager } from '@/utils';

// Components
import { AccountTabs } from '..';
import { ERROR_MESSAGES } from '@/constants';

jest.mock('@/services', () => ({
  getUserById: jest.fn(),
}));

jest.mock('@/actions', () => ({
  updateEmailSettings: jest.fn(),
}));

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  toastManager: {
    showToast: jest.fn(),
  },
}));

describe('AccountTabs component', () => {
  beforeEach(() => {
    global.confirm = jest.fn();

    (getUserById as jest.Mock).mockResolvedValue({
      user: {
        announcements: true,
        updates: true,
        feedbacksAndSurvey: true,
        events: true,
        generalNotification: true,
        promotions: true,
        eventsNearMe: true,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render snapshot correctly.', async () => {
    await act(async () => {
      const { container } = render(<AccountTabs session={MOCK_SESSION_DATA} />);
      expect(container).toMatchSnapshot();
    });
  });

  it('Should log an error when fetching user data fails', async () => {
    (getUserById as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    render(<AccountTabs session={MOCK_SESSION_DATA} />);

    await waitFor(() => {
      expect(toastManager.showToast).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_MESSAGES.ERROR_FETCHING_DATA),
        'error',
        'top-center',
      );
    });
  });

  it('Should update email settings successfully', async () => {
    const { getByLabelText, getByTestId, getAllByLabelText } = render(
      <AccountTabs session={MOCK_SESSION_DATA} />,
    );

    fireEvent.click(getByLabelText('label-account-tabs-1'));

    await waitFor(() => {
      const checkboxes = getAllByLabelText('check-references-0');
      fireEvent.click(checkboxes[0]);

      fireEvent.click(getByTestId('update-email-preferences'));
    });

    expect(updateEmailSettings).toHaveBeenCalledWith(
      82,
      expect.objectContaining({
        announcements: true,
        events: false,
        eventsNearMe: false,
        feedbacksAndSurvey: false,
        generalNotification: false,
        promotions: false,
        updates: false,
      }),
    );
  });

  it('Should return an error message when update fails', async () => {
    const errorMessage = 'Failed to update email settings';
    (updateEmailSettings as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );
    (getUserById as jest.Mock).mockResolvedValue({
      user: {
        announcements: false,
        updates: false,
        feedbacksAndSurvey: false,
        events: false,
        generalNotification: false,
        promotions: false,
        eventsNearMe: false,
      },
    });

    const { getByLabelText, getByTestId, getAllByLabelText, getByText } =
      render(<AccountTabs session={MOCK_SESSION_DATA} />);

    fireEvent.click(getByLabelText('label-account-tabs-1'));

    await waitFor(() => {
      const checkboxes = getAllByLabelText('check-references-0');
      fireEvent.click(checkboxes[0]);

      fireEvent.click(getByTestId('update-email-preferences'));
    });

    expect(getByText('Email Settings')).toBeInTheDocument();
  });

  it('Should handle confirm navigation', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    const { getByLabelText } = render(
      <AccountTabs session={MOCK_SESSION_DATA} />,
    );

    fireEvent.change(getByLabelText('current password'), {
      target: { value: '123' },
    });

    fireEvent.click(getByLabelText('label-account-tabs-1'));
    expect(global.confirm).toHaveBeenCalledWith(
      'The entered data will not be saved. Do you want to leave?',
    );
  });
});
