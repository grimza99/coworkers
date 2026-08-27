'use server';

import axiosServer from '@/lib/axiosServer';
import { updateTag } from 'next/cache';
import { BFF_API } from '@/constants/api';
import { Task, Tasklist } from '@/types/task';

export const revalidateTasks = async () => {
  updateTag(`getTasks`);
};

export const revalidateTaskLists = async () => {
  updateTag(`getTaskList`);
};

export const revalidateDetailTask = async () => {
  updateTag(`getDetailTask`);
};

export const getTaskLists = async (groupId: string) => {
  try {
    const { data } = await axiosServer(BFF_API.group.detail(groupId), {
      fetchOptions: { next: { tags: [`getTaskList`] } },
    });
    const fetchedTaskLists: Tasklist[] = data.taskLists;

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
