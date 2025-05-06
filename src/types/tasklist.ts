import { Task } from '@/types/task';

export interface Tasklist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
}
