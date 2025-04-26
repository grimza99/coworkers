type Frequency = 'DAILY' | 'WEEKLY' | 'ONCE' | 'MONTHLY';

//teamId/groups/[groupId]/task-lists/id

export interface TaskListItemResponse {
  doneBy: {
    user: {
      image: string;
      nickname: string;
      id: number;
    };
  };
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
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

export interface TaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: TaskListItemResponse[];
}
