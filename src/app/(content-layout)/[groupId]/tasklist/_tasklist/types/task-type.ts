import { Member } from './member-type';
import { Task, Tasklist } from '@/types/task';

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
