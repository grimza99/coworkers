import { Task, TaskList } from '../types/task-list-page-type';

const INITIAL_TASKLIST: TaskList = {
  displayIndex: 0,
  groupId: 0,
  updatedAt: '',
  createdAt: '',
  name: '',
  id: 0,
  tasks: [''],
};

const INITIAL_TASKLISTS: TaskList[] = [INITIAL_TASKLIST];

const INITIAL_TASK: Task = {
  displayIndex: 0,
  commentCount: 0,
  frequency: 'ONCE',
  doneAt: '',
  date: '',
  description: '',
  doneBy: {
    user: { id: 0, nickname: '', image: '' },
  },
  writer: { id: 0, nickname: '', image: '' },
  deletedAt: '',
  recurringId: 0,
  updatedAt: '',
  name: '',
  id: 0,
};
const INITIAL_TASKS: Task[] = [INITIAL_TASK];

export { INITIAL_TASKLIST, INITIAL_TASKLISTS, INITIAL_TASK, INITIAL_TASKS };
