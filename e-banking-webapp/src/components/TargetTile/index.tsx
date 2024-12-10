// Interfaces
import { CurrencyUnit } from '@/interfaces';

// Components
import { Text } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

interface TargetTileProps {
  icon: () => JSX.Element;
  title: string;
  targetAmount: number;
  deposit: number;
  currencyUnit?: CurrencyUnit;
}

export const TargetTile = ({
  icon,
  title,
  targetAmount,
  deposit,
  currencyUnit = '$',
}: TargetTileProps) => {
  const TargetIcon = icon;

  const percentAchived = (targetAmount / deposit) * 100;

  return (
    <div className='flex items-center justify-between border-b border-dimGray p-4'>
      <div className='flex items-center gap-4'>
        <TargetIcon />
        <div className='flex flex-col'>
          <Text className='text-xs font-medium text-foreground-100'>
            {title}
          </Text>
          <div className='flex'>
            <Text as='span' className='text-2xs font-semibold text-success'>
              {currencyUnit} {formatNumberWithCommas(targetAmount)}
            </Text>
            <Text
              as='span'
              className='text-2xs font-semibold text-foreground-100 opacity-30'
            >
              /{currencyUnit} {formatNumberWithCommas(deposit)}
            </Text>
          </div>
        </div>
      </div>
      <Text className='text-xs text-foreground-100'>{percentAchived}%</Text>
    </div>
  );
};
