'use client';

// Libs
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { ReactNode } from 'react';

// Interfaces
import { TEXT_SIZE } from '@/interfaces';

// Components
import { Text } from '@/components';

interface ITransactionHistory {
  totalTransaction: number;
  table: ReactNode;
}

export const TransactionHistory = ({
  totalTransaction,
  table,
}: ITransactionHistory) => {
  return (
    <Card className='gap-5 rounded-md px-[17px] py-[15px]'>
      <CardHeader className='flex flex-col items-start gap-1 p-0'>
        <Text size={TEXT_SIZE.SM} className='font-semibold !text-navyBlue'>
          {/* TODO:  The Transaction History number will be get from API*/}
          Transaction History ({
            totalTransaction
          })
        </Text>
        <Text size={TEXT_SIZE.XS} className='font-normal !text-neutralGray'>
          See history of your transaction
        </Text>
      </CardHeader>

      <CardBody className='flex flex-col p-0'>
        {/* TODO:  This will be implemented when the TransactionTable component is available.*/}
        {table}
      </CardBody>
    </Card>
  );
};
