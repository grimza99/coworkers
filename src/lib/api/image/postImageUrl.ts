import { BFF_API } from '@/constants/api';
import axiosClient from '@/lib/axiosClient';

export default async function postImageUrl(file: File) {
  const image = new FormData();
  image.append('image', file);

  const response = await axiosClient.post(BFF_API.image.upload, image);

  return response.data;
}
