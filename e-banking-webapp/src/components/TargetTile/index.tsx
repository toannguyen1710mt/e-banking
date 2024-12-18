// Interfaces
import { CurrencyUnit } from '@/interfaces';

// Components
import { Text } from '@/components';

// Utils
import { calculatePercentage, formatNumberWithCommas } from '@/utils';

interface TargetTileProps {
  icon: () => JSX.Element;
  title: string;
  deposit: number;
  targetAmount: number;
  currencyUnit?: CurrencyUnit;
}

export const TargetTile = ({
  icon,
  title,
  deposit,
  targetAmount,
  currencyUnit = '$',
}: TargetTileProps) => {
  const TargetIcon = icon;

  return (
    <div className='mx-[6px] flex items-center justify-between border-b border-dimGray p-4'>
      <div className='flex items-center gap-4'>
        <TargetIcon />
        <div className='flex flex-col'>
          <Text className='text-xs font-medium text-foreground-100'>
            {title}
          </Text>
          <div className='flex'>
            <Text as='span' className='text-2xs font-semibold text-success'>
              {currencyUnit} {formatNumberWithCommas(deposit)}
            </Text>
            <Text
              as='span'
              className='text-2xs font-semibold text-foreground-100 opacity-30'
            >
              /{currencyUnit} {formatNumberWithCommas(targetAmount)}
            </Text>
          </div>
        </div>
      </div>
      <Text className='text-xs font-bold text-foreground-100'>
        {calculatePercentage(deposit, targetAmount)}%
      </Text>
    </div>
  );
};
