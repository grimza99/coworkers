import { Task } from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-list-page-type';

export interface TaskItem
  extends Pick<Task, 'id' | 'name' | 'frequency' | 'weekDays' | 'description'> {
  date: Date | string;
}

export interface Time {
  period: '오전' | '오후';
  time: string;
}

export interface TaskItemProps {
  task?: TaskItem;
  groupId: number;
  taskListId: number;
}

export interface CreateTaskItemProps extends Pick<TaskItemProps, 'task'> {
  interceptTaskItem: (item: TaskItem) => void;
}
