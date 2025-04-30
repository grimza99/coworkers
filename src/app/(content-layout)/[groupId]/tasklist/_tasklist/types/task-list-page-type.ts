type Frequency = 'DAILY' | 'WEEKLY' | 'ONCE' | 'MONTHLY';
type Role = 'ADMIN' | 'MEMBER';

// taskLists[] -> taskList{}-> tasks[]-> task(기준){}

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

//teamId/groups/[groupId]

export interface GroupApiResponse {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: Member[];
  taskLists: TaskList[];
}

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

export type TasksApiResponse = Task[];

//teamId/groups/[groupId]/task-lists/{taskListId}/tasks/{taskId}
//할일 상세보기

export interface DetailTaskApiResponse {
  writer: User;
  date: string;
  description: string;
  name: string;
  id: number;
  doneBy: {
    user: User;
  };
  displayIndex: number;
  commentCount: number;
  deletedAt: string;
  recurringId: number;
  frequency: Frequency;
  updatedAt: string;
  doneAt: string;
}

//tasks/{taskId}/comments
//할일 상세보기의 댓글 - 배열 형태

export interface TaskCommentApiResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  user: User;
}
