import { fireEvent, render } from '@testing-library/react';

// Mock data
import { MOCK_DATA_USER, MOCK_DATA_USER_EMPTY_PROPS } from '@/mocks';

// Components
import { MyCards } from '..';

describe('MyCards component', () => {
  it('Should render snapshot correctly.', () => {
    expect(
      render(
        <MyCards accounts={MOCK_DATA_USER.accounts} onCardSelect={jest.fn()} />,
      ),
    ).toMatchSnapshot();
  });

  it('Should render snapshot with accounts is empty.', () => {
    expect(render(<MyCards onCardSelect={jest.fn()} />)).toMatchSnapshot();
  });

  it('Should renders cards correctly with empty type and accountNumber', () => {
    const { asFragment } = render(
      <MyCards
        accounts={MOCK_DATA_USER_EMPTY_PROPS.accounts}
        onCardSelect={jest.fn()}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should handle select card.', () => {
    const mockOnCardSelect = jest.fn();

    const { getByLabelText } = render(
      <MyCards
        accounts={MOCK_DATA_USER.accounts}
        onCardSelect={mockOnCardSelect}
      />,
    );

    fireEvent.click(getByLabelText('card-item-1'));

    expect(mockOnCardSelect).toHaveBeenCalledWith(MOCK_DATA_USER.accounts?.[1]);
  });
});
