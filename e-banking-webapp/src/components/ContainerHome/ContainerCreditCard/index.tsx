// Components
import { CreditCard } from '@/components';

export const ContainerCreditCard = async () => {
  // TODO: call API to get credit card data
  return (
    <CreditCard
      cardNumber='537544114540'
      expireDate='06/28'
      holderName='DONALD FLINCH CORTEZ'
      bankName='Universal Bank'
    />
  );
};
