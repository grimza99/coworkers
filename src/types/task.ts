import { User } from '@/types/user';

export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  updatedAt: string;
  recurringId: number;
  frequency: string;
  displayIndex: number;
  commentCount: number;
  writer: User | null;
  doneAt: string | null;
  doneBy: {
    user: User | null;
  };
  deletedAt: string | null;
}
