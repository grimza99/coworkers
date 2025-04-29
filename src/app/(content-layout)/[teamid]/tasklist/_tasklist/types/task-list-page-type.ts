type Frequency = 'DAILY' | 'WEEKLY' | 'ONCE' | 'MONTHLY';
interface User {
  image: string;
  nickname: string;
  id: number;
}

//teamId/groups/[groupId]/task-lists/id
export interface TaskListItemApiResponse {
  doneBy: {
    user: User;
  };
  writer: User;
  displayIndex: number;
  commentCount: number;
  deletedAt: string;
  recurringId: number;
  frequency: Frequency;
  updatedAt: string;
  doneAt: string;
  date: string;
  description: string;
  name: string;
  id: number;
}

export interface TaskListApiResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: TaskListItemApiResponse[];
}

//teamId/groups/[groupId]/task-lists/{taskListId}/tasks
//특정 일자, 특정 할일 리스트이 할일 리스트 (date를 받음)- 배열 형태

export interface TodoListProps {
  displayIndex: number;
  commentCount: number;
  frequency: Frequency;
  doneAt: string;
  date: string;
  description: string;
}

export interface TodoListApiResponse extends TodoListProps {
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
//할일 상세보기

export interface TodoDetailContentProps {
  writer: User;
  date: string;
  description: string;
  name: string;
  id: number;
}

export interface TodoDetailContentApiResponse extends TodoDetailContentProps {
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

export interface ToDoCommentApiResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  user: User;
}
