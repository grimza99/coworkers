'use server';
import { revalidateTag } from 'next/cache';
import axiosServer from '@/lib/axiosServer';
import { Group } from '@/types/group';
import { User } from '@/types/user';

export async function postMemberAction(groupId: Group['id'], userEmail: string) {
  try {
    const res = await axiosServer.post(`/groups/${groupId}/member`, { userEmail });
    if (res.status === 204) {
      revalidateTag('group');
    }
    return { success: true, message: '멤버 추가 성공' };
  } catch {
    return { success: false, message: '멤버 추가 실패' };
  }
}

export async function deleteMemberAction(groupId: Group['id'], userId: User['id']) {
  try {
    await axiosServer.delete(`/groups/${groupId}/member/${userId}`);
    revalidateTag('group');
    return { success: true, message: '멤버 삭제 성공' };
  } catch {
    return { success: false, message: '멤버 삭제 실패' };
  }
}
