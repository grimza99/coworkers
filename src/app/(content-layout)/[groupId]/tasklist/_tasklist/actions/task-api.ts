'use server';

import axiosServer from '@/lib/axiosServer';
import { Task, TaskList } from '../types/task-type';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateTaskPath = async (taskListId: number) => {
  revalidatePath(`/[groupId]/task-list?taskList=${taskListId}`, 'page');
};

export const revalidateTasks = async (groupId: string, taskListId: number, date: Date | string) => {
  revalidateTag(`getTasks-${groupId}-${taskListId}-${date}`);
  const data = await getTasks(groupId, taskListId, date);
  return data;
};

export const revalidateTaskLists = async (groupId: string) => {
  revalidateTag(`getTaskList-${groupId}`);
};

export const getTaskLists = async (groupId: string) => {
  try {
    const { data: taskListsData } = await axiosServer(`/groups/${groupId}`, {
      fetchOptions: { next: { tags: [`getTaskList-${groupId}`] } },
    });
    const fetchedTaskLists: TaskList[] = taskListsData.taskLists;

    return fetchedTaskLists;
  } catch (error) {
    if (error instanceof Error) {
      throw Error;
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

export const getTasks = async (groupId: string, taskListId: number, date: Date | string) => {
  try {
    const { data } = await axiosServer(`groups/${groupId}/task-lists/${taskListId}/tasks`, {
      params: { date },
      fetchOptions: { next: { tags: [`getTasks-${groupId}-${taskListId}-${date}`] } },
    });
    const tasksData: Task[] = data;
    return tasksData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw Error;
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

// const fetchTaskLists = useCallback(async () => {
//   if (!date || !groupId) return;
//   try {
//     const { data: taskListsData } = await axiosClient(`/groups/${groupId}`);
//     const fetchedTaskLists: TaskList[] = taskListsData.taskLists;

//     if (taskListsData && fetchedTaskLists.length < 1) {
//       return (
//         <div className="flex h-200 items-center justify-center">
//           <p className="text-md-md text-gray500">
//             아직 할 일 목록이 없습니다.
//             <br />
//             새로운 목록을 추가 해주세요.
//           </p>
//         </div>
//       );
//     }

//     setTaskLists(fetchedTaskLists);
//     setCurrentTaskList(fetchedTaskLists[0]);
//     fetchTaskListWiseTasks(fetchedTaskLists[0]);
//   } catch (error) {
//     if (error instanceof Error) {
//       setError(error);
//     } else {
//       setError(new Error('Unknown error occurred'));
//     }
//   }
// }, [groupId, fetchTaskListWiseTasks, date]);

// const fetchTaskListWiseTasks = useCallback(
//   async (currentTaskList: TaskList) => {
//     if (!currentTaskList) return;

//     try {
//       const { data: tasksData } = await axiosClient(
//         `groups/${groupId}/task-lists/${currentTaskList.id}/tasks`,
//         {
//           params: { date },
//         }
//       );

//       setCurrentTasks(tasksData);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setError(error);
//       } else {
//         setError(new Error('Unknown error occurred'));
//       }
//     }
//   },

//   [groupId, date]
// );
