import { BACKEND_API } from '@/constants/api';
import { requestHeader } from '@/lib/api/headers';
import { NextRequest, NextResponse } from 'next/server';

/**---------------------------------------------------- 특정 task 조회 ----------------------------------------------------- */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; taskListId: string; taskId: string }> }
) {
  const { id: groupId, taskListId, taskId } = await params;

  try {
    const res = await fetch(`${BACKEND_API.task.detail(groupId, taskListId, taskId)}`, {
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

/**---------------------------------------------------- task 수정 ----------------------------------------------------- */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; taskListId: string; taskId: string }> }
) {
  const body = await request.json();
  const { id: groupId, taskListId, taskId } = await params;

  try {
    const res = await fetch(`${BACKEND_API.task.edit(groupId, taskListId, taskId)}`, {
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

/**---------------------------------------------------- task 삭제 ----------------------------------------------------- */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; taskListId: string; taskId: string }> }
) {
  const { id: groupId, taskListId, taskId } = await params;

  try {
    const res = await fetch(`${BACKEND_API.task.delete(groupId, taskListId, taskId)}`, {
      method: 'DELETE',
      headers: requestHeader(request),
    });
    if (!res.ok) {
      return NextResponse.json({ message: 'Fetch failed' }, { status: res.status });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('User Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
