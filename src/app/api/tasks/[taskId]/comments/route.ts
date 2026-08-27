import { BACKEND_API } from '@/constants/api';
import { requestHeader } from '@/lib/api/headers';
import { NextRequest, NextResponse } from 'next/server';

/**---------------------------------------------------- task 댓글 조회 ----------------------------------------------------- */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;

  try {
    const res = await fetch(`${BACKEND_API.task.comment.list(taskId)}`, {
      method: 'GET',
      headers: requestHeader(request),
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Fetch failed' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('User Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
