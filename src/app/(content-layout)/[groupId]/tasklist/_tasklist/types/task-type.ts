import { Member } from './member-type';
import { Task, Tasklist } from '@/types/task';

export type Frequency = 'DAILY' | 'WEEKLY' | 'ONCE' | 'MONTHLY';

export interface Recurring {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  frequencyType: Frequency;
  weekDays?: number[];
  monthDay?: number;
  taskListId: number;
  groupId: number;
  writerId: number;
}
// taskLists[] -> taskList{}-> tasks[]-> task(기준){} -> detailTask

//teamId/groups/[groupId]:get
export interface TaskListsApiResponse {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: Member[];
  taskLists: Tasklist[];
}

//teamId/groups/[groupId]/task-lists/{taskListId}/tasks

export type TasksApiResponse = Task[];

//teamId/groups/[groupId]/task-lists/{taskListId}/tasks/{taskId}

export interface DetailTaskType extends Task {
  recurring: Recurring;
}
