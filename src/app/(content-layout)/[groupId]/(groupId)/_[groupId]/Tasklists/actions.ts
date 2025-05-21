'use server';
import { revalidateTag } from 'next/cache';
import axiosServer from '@/lib/axiosServer';
import { Group } from '@/types/group';
import { Tasklist } from '@/types/tasklist';

export async function createTasklistAction(groupId: Group['id'], name: string) {
  try {
    await axiosServer.post(`/groups/${groupId}/task-lists`, { name });
    revalidateTag('group');
    return { success: true, message: '할일 목록이 성공적으로 추가되었습니다.' };
  } catch {
    return { success: false, message: '할일 목록 추가에 실패했습니다.' };
  }
}

export async function updateTasklistAction(
  groupId: Group['id'],
  tasklistId: Tasklist['id'],
  name: string
) {
  try {
    await axiosServer.patch(`/groups/${groupId}/task-lists/${tasklistId}`, { name });
    revalidateTag('group');
    return { success: true, message: '할일 목록이 성공적으로 수정되었습니다.' };
  } catch {
    return { success: false, message: '할일 목록 수정에 실패했습니다.' };
  }
}

export async function deleteTasklistAction(groupId: Group['id'], tasklistId: Tasklist['id']) {
  try {
    await axiosServer.delete(`/groups/${groupId}/task-lists/${tasklistId}`);
    revalidateTag('group');
    return { success: true, message: '할일 목록이 성공적으로 삭제되었습니다.' };
  } catch {
    return { success: false, message: '할일 목록 삭제에 실패했습니다.' };
  }
}
