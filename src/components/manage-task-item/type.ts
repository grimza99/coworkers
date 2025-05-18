import {
  Recurring,
  DetailTaskType,
} from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-type';

export type TaskItem = Pick<
  Recurring,
  'name' | 'description' | 'frequencyType' | 'weekDays' | 'monthDay'
> & {
  startDate: Date | string;
};

export interface Time {
  period: '오전' | '오후';
  time: string;
}

export interface TaskItemProps {
  detailTask?: DetailTaskType;
  groupId: number;
  taskListId: number;
  isDone?: boolean;
  createOrEditModalId?: string;
}
