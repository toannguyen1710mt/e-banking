describe('Header component', () => {
  // const renderWithProviders = (ui: React.ReactNode) => {
  //   return render(<ToastProvider>{ui}</ToastProvider>);
  // };

  test('matches the snapshot', () => {
    // const { container } = renderWithProviders(
    //   <Header session={MOCK_SESSION_DATA} />,
    // );
    // expect(container).toMatchSnapshot();
  });

  test('renders the header with logo and menu items', () => {
    // renderWithProviders(<Header session={MOCK_SESSION_DATA} />);
    // // Check for logo
    // const logo = screen.getByAltText('Logo EBanking');
    // expect(logo).toBeInTheDocument();
    // // Check for mobile menu toggle button
    // const menuToggle = screen.getByLabelText('Open menu');
    // expect(menuToggle).toBeInTheDocument();
    // // Check for avatar
    // const avatar = screen.getByRole('img', { name: /avatar/i });
    // expect(avatar).toBeInTheDocument();
    // // Check for menu content
    // const navbarItems = screen.getAllByRole('button');
    // expect(navbarItems).toHaveLength(3); // Search, Notification, and Avatar
  });

  test('toggles the mobile menu on click', () => {
    // renderWithProviders(<Header session={MOCK_SESSION_DATA} />);
    // // Find menu toggle button
    // const menuToggle = screen.getByLabelText('Open menu');
    // // Click to open menu
    // fireEvent.click(menuToggle);
    // expect(menuToggle).toHaveAttribute('aria-label', 'Close menu');
    // // Click again to close menu
    // fireEvent.click(menuToggle);
    // expect(menuToggle).toHaveAttribute('aria-label', 'Open menu');
  });

  test('disables search and notification buttons', () => {
    // renderWithProviders(<Header session={MOCK_SESSION_DATA} />);
    // const searchButton = screen.getByRole('button', { name: /search icon/i });
    // const notificationButton = screen.getByRole('button', {
    //   name: /notification icon/i,
    // });
    // expect(searchButton).toBeDisabled();
    // expect(notificationButton).toBeDisabled();
  });
});
