import axiosClient from '@/lib/axiosClient';

interface RecurringItem {
  groupId: number;
  taskListId: number;
  taskId: number;
}

export default async function getDetailTaskItem({ groupId, taskListId, taskId }: RecurringItem) {
  const response = await axiosClient(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`);

  return response.data;
}
