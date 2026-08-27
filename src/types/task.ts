import { Frequency } from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-type';
import { User } from '@/types/user';

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
