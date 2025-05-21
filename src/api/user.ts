import axiosClient from '@/lib/axiosClient';
import { getUserApiResponse } from '@/types/user';

export const getUser = () => axiosClient.get<getUserApiResponse>('/user');
