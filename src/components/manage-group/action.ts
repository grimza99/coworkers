'use server';

import axiosServer from '@/lib/axiosServer';

export default async function getUserGroup() {
  const groupNameResponse = await axiosServer('/user/groups');

  const groupNames = groupNameResponse.data.map((group: { name: string }) => group.name);

  return groupNames;
}
