import { fireEvent, render } from '@testing-library/react';
import { RadioGroup } from '@nextui-org/react';

// Components
import { RadioButton } from '..';

describe('RadioButton component', () => {
  const handleChange = jest.fn();

  it('Should render correctly snapshot', () => {
    expect(
      render(
        <RadioGroup>
          <RadioButton value='Main Wallet'>Main Wallet</RadioButton>
        </RadioGroup>,
      ),
    ).toMatchSnapshot();
  });

  it('Should render correctly with children', () => {
    const { getByText } = render(
      <RadioGroup>
        <RadioButton value='Savings'>Savings</RadioButton>
      </RadioGroup>,
    );

    expect(getByText('Savings')).toBeInTheDocument();
  });

  it('calls onChange when radio button is selected', () => {
    const { getByText } = render(
      <RadioGroup>
        <RadioButton value='option1' onChange={handleChange}>
          Option 1
        </RadioButton>
      </RadioGroup>,
    );

    const radio = getByText('Option 1');
    expect(handleChange).not.toHaveBeenCalled();

    fireEvent.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything());
  });
});
