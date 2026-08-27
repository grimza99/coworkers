import { BACKEND_API } from '@/constants/api';
import { requestHeader } from '@/lib/api/headers';
import { NextRequest, NextResponse } from 'next/server';

/**---------------------------------------------------- 특정 게시물의 댓글 조회 ----------------------------------------------------- */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: articleId } = await params;
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();

  try {
    const res = await fetch(`${BACKEND_API.article.comment.list(articleId)}?${queryString}`, {
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

/**---------------------------------------------------- 특정 게시글 댓글 작성 ----------------------------------------------------- */
export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const res = await fetch(`${BACKEND_API.article.comment.create}`, {
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
