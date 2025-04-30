type Frequency = 'DAILY' | 'WEEKLY' | 'ONCE' | 'MONTHLY';
type Role = 'ADMIN' | 'MEMBER';

type Member = {
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

interface User {
  image: string;
  nickname: string;
  id: number;
}

// taskLists[] -> taskList{}-> tasks[]-> task(기준){}

//기준이 되는 인터페이스
export interface Task {
  displayIndex: number;
  commentCount: number;
  frequency: Frequency;
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

export type Tasks = Task[];
