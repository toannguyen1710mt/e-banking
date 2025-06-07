import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { isInValidToken } from '@/utils';

export async function POST(request: Request): Promise<NextResponse> {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (isInValidToken(token!)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({
        Message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        status: 500,
      });
    }
    const blob = await put(file?.name, file, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json({
      Message: error || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500,
    });
  }
}
