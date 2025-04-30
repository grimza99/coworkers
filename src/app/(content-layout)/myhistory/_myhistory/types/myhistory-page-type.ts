type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

//데이터 구조 taskLists[] -> taskList{}-> tasks[]-> task{}

//기준이 되는 인터페이스
export interface HistoryTask {
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

export interface HistoryTasksApiResponse {
  tasksDone: HistoryTask[];
}

export interface GroupedByDateTask {
  doneAt: HistoryTask['doneAt'];
  id: HistoryTask['id'];
  date: HistoryTask['date'];
  description: HistoryTask['description'];
}
