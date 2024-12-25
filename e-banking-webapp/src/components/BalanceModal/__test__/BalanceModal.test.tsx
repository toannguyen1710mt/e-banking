jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

jest.mock('@/constants/rules', () => ({
  createStepSchema: jest.fn(),
}));

describe('BalanceModal component', () => {
  it('Should render snapshot correctly', () => {
    // expect(
    //   render(
    //     <BalanceModal
    //       user={MOCK_DATA_USER}
    //       onClose={jest.fn()}
    //       isOpen={true}
    //     />,
    //   ),
    // ).toMatchSnapshot();
  });
});
