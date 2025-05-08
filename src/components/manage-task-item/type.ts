import {
  Frequency,
  Task,
} from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-list-page-type';

export interface TaskItem extends Pick<Task, 'name' | 'description'> {
  weekDays?: number[];
  monthDay?: number;
  startDate: Date | string;
  frequencyType: Frequency;
}

export interface Time {
  period: '오전' | '오후';
  time: string;
}

export interface TaskItemProps {
  task?: Task;
  groupId: number;
  taskListId: number;
  createOrEditModalId?: string;
}
