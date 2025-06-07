import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/constants';
import { httpClient } from '@/services';
import { ICard, IUser, ResponseData } from '@/interfaces';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const slug = (await params).slug;
  const jwt = request.headers.get('Authorization')?.split(' ')[1];

  try {
    const requestEndpoint = `${API_ENDPOINTS.USERS}/me?populate[accounts][populate]=cards`;
    let dataCardMain = {};

    const { data } = await httpClient.get<ResponseData<IUser>>(
      requestEndpoint,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    if (!data) {
      return NextResponse.json({});
    }

    const accounts = data?.accounts || [];
    if (accounts.length) {
      const sortedCards = accounts
        .flatMap((account: { cards: ICard[]; type: string }) =>
          account.cards.map((card) => ({
            ...card,
            accountType: account.type,
          })),
        )
        .filter(
          (item: { accountType: string }) =>
            item.accountType?.toLocaleLowerCase() === slug.toLocaleLowerCase(),
        )
        .reduce(
          (oldest: { createdAt: string }, current: { createdAt: string }) => {
            const currentDate = new Date(current.createdAt ?? 0);
            const oldestDate = new Date(oldest.createdAt ?? 0);
            return currentDate < oldestDate ? current : oldest;
          },
        );

      dataCardMain = sortedCards;
    }

    return NextResponse.json(dataCardMain);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
