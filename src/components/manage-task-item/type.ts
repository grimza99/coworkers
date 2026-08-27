import { RecurringTask } from '@/types/recurring';
import { Task } from '@/types/task';

export type TaskItem = Pick<
  RecurringTask,
  'name' | 'description' | 'frequencyType' | 'weekDays' | 'monthDay'
> & {
  startDate: Date | string;
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
