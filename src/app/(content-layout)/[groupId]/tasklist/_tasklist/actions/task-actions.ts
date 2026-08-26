'use server';

import axiosServer from '@/lib/axiosServer';
import { Task, TaskList } from '../types/task-type';
import { revalidateTag, updateTag } from 'next/cache';
import { BFF_API } from '@/constants/api';

export const revalidateTasks = async () => {
  revalidateTag(`getTasks`, 'max');
};

export const revalidateTaskLists = async () => {
  updateTag(`getTaskList`);
};

export const revalidateDetailTask = async () => {
  revalidateTag(`getDetailTask`, 'max');
};

export const getTaskLists = async (groupId: string) => {
  try {
    const { data } = await axiosServer(BFF_API.group.detail(groupId), {
      fetchOptions: { next: { tags: [`getTaskList`] } },
    });
    const fetchedTaskLists: TaskList[] = data.taskLists;

    return fetchedTaskLists;
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (groupId: string, taskListId: number, date: Date | string) => {
  try {
    const { data } = await axiosServer(`/groups/${groupId}/task-lists/${taskListId}/tasks`, {
      params: { date },
      fetchOptions: { next: { tags: ['getTasks'] } },
    });
    const tasksData: Task[] = data;
    return tasksData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
export const getDetailTask = async (taskId: string) => {
  try {
    const { data } = await axiosServer(`/groups/groupId/task-lists/taskListId/tasks/${taskId}`, {
      fetchOptions: { next: { tags: ['getDetailTask'] } },
    });
    return data;
  } catch (error: unknown) {
    console.error(error);
  }
};
