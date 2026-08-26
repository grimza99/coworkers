import { BACKEND_API } from '@/constants/api';
import { requestHeader } from '@/lib/api/headers';
import { NextRequest, NextResponse } from 'next/server';

/**---------------------------------------------------- 할일  생성 ----------------------------------------------------- */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; taskListId: string }> }
) {
  const body = await request.json();
  const { id: groupId, taskListId } = await params;

  try {
    const res = await fetch(`${BACKEND_API.task.create(groupId, taskListId)}`, {
      method: 'POST',
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
