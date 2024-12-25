import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Constants
import { ERROR_MESSAGES } from '@/constants';

export async function POST(request: Request): Promise<NextResponse> {
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
