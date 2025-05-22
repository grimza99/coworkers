'use server';

import axiosServer from '@/lib/axiosServer';
import { Task, TaskList } from '../types/task-type';
import { revalidateTag } from 'next/cache';

export const revalidateTasks = async () => {
  revalidateTag(`getTasks`);
};

export const revalidateTaskLists = async () => {
  revalidateTag(`getTaskList`);
};

export const getTaskLists = async (groupId: string) => {
  try {
    const { data: taskListsData } = await axiosServer(`/groups/${groupId}`, {
      fetchOptions: { next: { tags: [`getTaskList`] } },
    });
    const fetchedTaskLists: TaskList[] = taskListsData.taskLists;

    return fetchedTaskLists;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    } else {
      throw new Error('Unknown error occurred');
    }
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
      console.log(error);

      throw new Error('Unknown error occurred');
    }
  }
};
