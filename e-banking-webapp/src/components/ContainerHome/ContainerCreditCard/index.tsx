import { auth } from '@/config/auth';

// Services
import { getMainCardByUserId } from '@/services';

// Components
import { CreditCard } from '@/components';

export const ContainerCreditCard = async () => {
  const session = await auth();
  const card = await getMainCardByUserId(Number(session?.user.id));

  const { cardNumber, expireAt, holderName } = card;

  return (
    <CreditCard
      cardNumber={cardNumber}
      expireDate={expireAt}
      holderName={holderName}
      bankName='Universal Bank'
    />
  );
};
