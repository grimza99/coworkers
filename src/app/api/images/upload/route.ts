import { BACKEND_API } from '@/constants/api';
import { requestHeader } from '@/lib/api/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!(image instanceof File)) {
      return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append('image', image, image.name);

    const res = await fetch(BACKEND_API.image.upload, {
      method: 'POST',
      headers: requestHeader(request, 'multipart/form-data'),
      body: backendFormData,
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Fetch failed' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error('Image Upload Error:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
