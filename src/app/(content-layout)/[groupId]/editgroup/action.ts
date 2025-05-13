'use server';

import axiosServer from '@/lib/axiosServer';

export async function getGroupInfo(groupId: number) {
  const groupResponse = await axiosServer.get(`/groups/${groupId}`);

  const { id, name, image } = groupResponse.data;
  const groupData = { id, name, image };

  return groupData;
}

export async function deleteGroup(groupId: number) {
  await axiosServer.delete(`/groups/${groupId}`);
}
