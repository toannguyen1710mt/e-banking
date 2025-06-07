describe('Button Component', () => {
  it('applies the correct variant classes', () => {
    // const { container } = render(
    //   <Button variant='solid' color='default' size='lg'>
    //     Custom Button
    //   </Button>,
    // );
    // const buttonElement = container.querySelector('button');
    // expect(buttonElement).toHaveClass(
    //   'border-transparent bg-primary-100 text-foreground-200 w-full max-h-10 py-2.5 text-sm',
    // );
    // expect(container).toMatchSnapshot();
  });

  it('handles click events', () => {
    // const handleClick = jest.fn();
    // render(
    //   <Button type='button' value='button' onClick={handleClick}>
    //     Click me
    //   </Button>,
    // );
    // fireEvent.click(screen.getByText('Click me'));
    // expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders button with type submit', () => {
    // render(<Button type='submit'>Submit</Button>);
    // expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  });

  it('renders startIcon and endIcon', () => {
    // render(
    //   <Button
    //     type='button'
    //     value='button'
    //     startContent={<span>Start</span>}
    //     endContent={<span>End</span>}
    //   >
    //     Click me
    //   </Button>,
    // );
    // expect(screen.getByText('Start')).toBeInTheDocument();
    // expect(screen.getByText('End')).toBeInTheDocument();
  });
});
