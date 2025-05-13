'use server';

import axiosServer from '@/lib/axiosServer';

export async function getGroupInfo(groupId: number) {
  const response = await axiosServer.get(`/groups/${groupId}`);

  const { id, name, image } = response.data;
  const groupData = { id, name, image };

  return groupData;
}

export async function deleteGroup(groupId: number) {
  await axiosServer.delete(`/groups/${groupId}`);
}
