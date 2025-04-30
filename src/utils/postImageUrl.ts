import axiosClient from '@/lib/axiosClient';

export default async function postImageUrl(file: File) {
  const image = new FormData();
  image.append('image', file);

  const response = await axiosClient.post('/images/upload', image, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}
