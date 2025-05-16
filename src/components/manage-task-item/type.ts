import { Task } from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-type';

export type TaskItem = Pick<Task, 'name' | 'description' | 'monthDay' | 'weekDays'> & {
  id?: Task['id'];
  recurringId?: Task['recurringId'];
  startDate: Date | string;
  frequencyType: Task['frequency'];
};

export interface Time {
  period: '오전' | '오후';
  time: string;
}

export interface TaskItemProps {
  task?: Task;
  groupId: number;
  taskListId: number;
  isDone?: boolean;
  createOrEditModalId?: string;
}
