import { BFF_API } from '@/constants/api';
import axiosClient from '@/lib/axiosClient';

interface RecurringItem {
  groupId: number;
  taskListId: number;
  taskId: number;
}

export default async function getDetailTaskItem({ groupId, taskListId, taskId }: RecurringItem) {
  const response = await axiosClient(
    BFF_API.task.detail(String(groupId), String(taskListId), String(taskId))
  );

  return response.data;
}
