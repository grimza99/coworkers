import { User } from '@/types/user';

export type Frequency = 'DAILY' | 'WEEKLY' | 'ONCE' | 'MONTHLY';
type Role = 'ADMIN' | 'MEMBER';

// taskLists[] -> taskList{}-> tasks[]-> task(기준){} -> detailTask

type Member = {
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

//teamId/groups/[groupId]:get
export interface TaskListsApiResponse {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: Member[];
  taskLists: TaskList[];
}

export interface TaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

//teamId/groups/[groupId]/task-lists/{taskListId}/tasks

export type TasksApiResponse = Task[];

//기준이 되는 인터페이스
export interface Task {
  displayIndex: number;
  commentCount: number;
  frequency: Frequency;
  weekDays: number[];
  doneAt: string;
  date: string;
  description: string;
  doneBy: {
    user: User;
  };
  writer: User;
  deletedAt: string;
  recurringId: number;
  updatedAt: string;
  name: string;
  id: number;
}

//teamId/groups/[groupId]/task-lists/{taskListId}/tasks/{taskId}

export type DetailTask = Task;
