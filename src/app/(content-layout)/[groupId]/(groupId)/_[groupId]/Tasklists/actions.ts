'use server';
import { revalidateTag } from 'next/cache';
import axiosServer from '@/lib/axiosServer';
import { Group } from '@/types/group';
import { Tasklist } from '@/types/tasklist';

export async function createTasklistAction(groupId: Group['id'], name: string) {
  try {
    await axiosServer.post(`/groups/${groupId}/task-lists`, { name });
    revalidateTag('group');
    return { success: true, message: '할 일 목록 추가 성공' };
  } catch {
    return { success: false, message: '할 일 목록 추가 실패' };
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
    return { success: true, message: '할 일 목록 수정 성공' };
  } catch {
    return { success: false, message: '할 일 목록 수정 실패' };
  }
}

export async function deleteTasklistAction(groupId: Group['id'], tasklistId: Tasklist['id']) {
  try {
    await axiosServer.delete(`/groups/${groupId}/task-lists/${tasklistId}`);
    revalidateTag('group');
    return { success: true, message: '할 일 목록 삭제 성공' };
  } catch {
    return { success: false, message: '할 일 목록 삭제 실패' };
  }
}
