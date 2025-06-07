import { API_ENDPOINTS } from '@/constants';
import { ICard, IUser, ResponseData } from '@/interfaces';
import { httpClient } from '@/services';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const jwt = request.headers.get('Authorization')?.split(' ')[1];

  try {
    const requestEndpoint = `${API_ENDPOINTS.USERS}/me?populate[accounts][populate]=cards`;

    const { data } = await httpClient.get<ResponseData<IUser>>(
      requestEndpoint,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    if (!data) {
      return NextResponse.json([]);
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
        .sort(
          (a: { createdAt: string }, b: { createdAt: string }) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      return NextResponse.json(sortedCards);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
