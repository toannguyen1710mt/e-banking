import { API_ENDPOINTS, TAGS } from '@/constants';
import { ICard, SuccessResponse } from '@/interfaces';
import { httpClient } from '@/services';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;

  try {
    const { data: cardResult } = await httpClient.get<SuccessResponse<ICard[]>>(
      `${API_ENDPOINTS.ACCOUNTS}/${id}?populate=cards`,
      {
        next: { tags: [TAGS.CARD] },
      },
    );

    return NextResponse.json(cardResult?.data.cards[0] || {});
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
