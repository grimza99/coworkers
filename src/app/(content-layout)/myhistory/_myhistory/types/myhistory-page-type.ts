type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

//기준이 되는 인터페이스
export interface HistoryTaskItem {
  id: number;
  updatedAt: string;
  date: string;
  doneAt: string;
  recurringId: number;
  name: string;
  description: string;
  frequency: Frequency;
  deletedAt: null;
  userId: number;
  writerId: number;
  displayIndex: number;
}

export interface HistoryApiResponse {
  tasksDone: HistoryTaskItem[];
}

export interface GroupedByDateTaskListProps {
  doneAt: HistoryTaskItem['doneAt'];
  id: HistoryTaskItem['id'];
  date: HistoryTaskItem['date'];
  description: HistoryTaskItem['description'];
}
