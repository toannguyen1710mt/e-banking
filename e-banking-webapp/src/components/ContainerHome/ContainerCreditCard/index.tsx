import { auth } from '@/config/auth';

// Components
import { CreditCard } from '@/components';

export const ContainerCreditCard = async () => {
  const session = await auth();

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const response = await fetch(`${baseUrl}/api/cards/type/main`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  });
  const card = await response.json();

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
