import { Frequency } from './task';

export type RecurringTask = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  frequencyType: Frequency;
  weekDays?: number[];
  monthDay?: number;
  taskListId: number;
  groupId: number;
  writerId: number;
};
