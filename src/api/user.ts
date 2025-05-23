import axiosClient from '@/lib/axiosClient';
import { getUserApiResponse } from '@/types/user';

export const getUser = async () => axiosClient.get<getUserApiResponse>('/user');
