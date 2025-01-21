import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Components
import { EmailTab } from '..';

describe('EmailTab Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnUnsavedChanges = jest.fn();

  const defaultProps = {
    announcements: false,
    updates: false,
    feedbacksAndSurvey: false,
    events: false,
    generalNotification: false,
    promotions: false,
    eventsNearMe: false,
    onSubmit: mockOnSubmit,
    onUnsavedChanges: mockOnUnsavedChanges,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render snapshot correctly', () => {
    expect(
      render(
        <EmailTab
          onSubmit={mockOnSubmit}
          onUnsavedChanges={mockOnUnsavedChanges}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('should render the initial values correctly', () => {
    render(<EmailTab {...defaultProps} />);

    expect(
      screen.getByRole('checkbox', { name: /Announcements/i }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: /Updates/i }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: /Feedbacks & Survey/i }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: /General Notification/i }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: /Promotions/i }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: /Events Near Me/i }),
    ).not.toBeChecked();
  });

  it('should call onSubmit with the correct data when the form is submitted', async () => {
    render(<EmailTab {...defaultProps} />);

    const announcementsCheckbox = screen.getByLabelText(/Announcements/i);
    const eventsNearMeCheckbox = screen.getByLabelText(/Events Near Me/i);

    // Simulate changing the checkboxes to enable the form submission
    fireEvent.click(announcementsCheckbox);
    fireEvent.click(eventsNearMeCheckbox);

    const submitButton = screen.getByRole('button', {
      name: /Update Email Preferences/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        announcements: true,
        updates: false,
        feedbacksAndSurvey: false,
        events: false,
        generalNotification: false,
        promotions: false,
        eventsNearMe: true,
      });
    });
  });

  it('should track unsaved changes and call onUnsavedChanges when changes are made', async () => {
    render(<EmailTab {...defaultProps} />);

    const updatesCheckbox = screen.getByLabelText(/Updates/i);

    // Simulate a change
    fireEvent.click(updatesCheckbox);

    await waitFor(() => {
      expect(mockOnUnsavedChanges).toHaveBeenCalledWith(true);
    });
  });

  it('should reset form values when Unsubscribe from all button is clicked', async () => {
    render(<EmailTab {...{ ...defaultProps, announcements: true }} />);

    const unsubscribeButton = screen.getByRole('button', {
      name: /Unsubscribe from all/i,
    });

    fireEvent.click(unsubscribeButton);

    await waitFor(() => {
      // Check if all checkboxes are unchecked after reset
      expect(
        screen.getByRole('checkbox', { name: /Announcements/i }),
      ).not.toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: /Updates/i }),
      ).not.toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: /Feedbacks & Survey/i }),
      ).not.toBeChecked();

      expect(
        screen.getByRole('checkbox', { name: /General Notification/i }),
      ).not.toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: /Promotions/i }),
      ).not.toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: /Events Near Me/i }),
      ).not.toBeChecked();
    });
  });

  it('should display a loading state when the form is submitting', () => {
    render(<EmailTab {...defaultProps} />);

    // Simulate form submission
    fireEvent.click(
      screen.getByRole('button', { name: /Update Email Preferences/i }),
    );

    // Check that the button is loading
    expect(
      screen.getByRole('button', { name: /Update Email Preferences/i }),
    ).toBeDisabled();
  });
});
