import { User } from '@/types/user';

export type Frequency = 'DAILY' | 'WEEKLY' | 'ONCE' | 'MONTHLY';

export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  updatedAt: string;
  recurringId: number;
  frequency: Frequency;
  displayIndex: number;
  commentCount: number;
  writer: User | null;
  doneAt: string | null;
  doneBy: {
    user: User | null;
  };
  deletedAt: string | null;
  startDate: string | null;
}

export interface Tasklist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
}
