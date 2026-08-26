'use server';

import { BFF_API } from '@/constants/api';
import axiosServer from '@/lib/axiosServer';

export async function getGroupInfo(groupId: number) {
  const response = await axiosServer.get(BFF_API.group.detail(String(groupId)));

  const { id, name, image } = response.data;
  const groupData = { id, name, image };

  return groupData;
}

export async function deleteGroup(groupId: number) {
  await axiosServer.delete(`/groups/${groupId}`);
}
