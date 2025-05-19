'use server';
import { revalidateTag } from 'next/cache';
import axiosServer from '@/lib/axiosServer';
import { Group } from '@/types/group';

export async function createTasklistAction(groupId: Group['id'], name: string) {
  try {
    await axiosServer.post(`/groups/${groupId}/task-lists`, { name });
    revalidateTag('group');
    return { success: true, message: '할일 목록이 성공적으로 추가되었습니다.' };
  } catch {
    return { success: false, message: '할일 목록 추가에 실패했습니다.' };
  }
}
