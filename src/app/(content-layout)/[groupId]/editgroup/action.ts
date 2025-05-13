'use server';

import axiosServer from '@/lib/axiosServer';

export async function getGroupInfo(groupId: number) {
  const groupResponse = await axiosServer.get(`/groups/${groupId}`);

  const { id, name, image } = groupResponse.data;
  const groupData = { id, name, image };

  return groupData;
}

export async function deletGroup(formData: FormData) {
  const groupId = Number(formData.get('groupId'));

  await axiosServer.delete(`/groups/${groupId}`);
}
