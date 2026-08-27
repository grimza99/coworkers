import { BACKEND_API } from '@/constants/api';
import { requestHeader } from '@/lib/api/headers';
import { NextRequest, NextResponse } from 'next/server';

/**---------------------------------------------------- task  댓글 수정 ----------------------------------------------------- */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string; commentId: string }> }
) {
  const body = await request.json();
  const { taskId, commentId } = await params;

  try {
    const res = await fetch(`${BACKEND_API.task.comment.edit(taskId, commentId)}`, {
      method: 'PATCH',
      headers: requestHeader(request),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Fetch failed' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('User Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
