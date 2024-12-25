import { CardStatistics } from '@/interfaces';

export const EXPENSE_LABEL_DATA = ['Amazon', 'Netflix', 'Apple', 'Figma'];
export const EXPENSE_VALUE_DATA = ['#8AB17D', '#2A9D8F', '#F4A261', '#E9C46A'];
export const EXPENSE_COLOR_CLASSES = [
  'bg-[#8AB17D]',
  'bg-[#2A9D8F]',
  'bg-[#F4A261]',
  'bg-[#E9C46A]',
];
export const AVAILABLE_WALLETS = [
  CardStatistics.Savings,
  CardStatistics.Checkings,
];
export const CARD_STATISTICS = [
  {
    label: CardStatistics.Balance,
    color: 'bg-java',
  },
  {
    label: CardStatistics.Savings,
    color: 'bg-pastelYellow',
  },
  {
    label: CardStatistics.Checkings,
    color: 'bg-softGreen',
  },
];
