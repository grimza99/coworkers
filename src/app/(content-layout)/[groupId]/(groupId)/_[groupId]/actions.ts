'use server';
import axiosServer from '@/lib/axiosServer';
import { getGroupApiResponse, Group } from '@/types/group';
import { Membership } from '@/types/user';
import { cache } from 'react';

export const getGroup = cache(async (groupId: Group['id']) => {
  const data = await axiosServer
    .get<getGroupApiResponse>(`/groups/${groupId}`, { fetchOptions: { next: { tags: ['group'] } } })
    .then((res) => res.data);
  return data;
});

export const getUserMemberships = async () => {
  'use server';
  const data = await axiosServer.get<Membership[]>(`/user/memberships`).then((res) => res.data);
  return data;
};
