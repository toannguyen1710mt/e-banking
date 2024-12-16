export const TRANSFER_CONFIRM_DATA = {
  title: 'Your are about to transfer',
  amount: 1500,
  description:
    'From your main wallet to your Savings wallet, this action cannot be undone once approved...',
  onCancel: () => alert('Cancel clicked!'),
  onProceed: () => alert('Proceed clicked!'),
};
