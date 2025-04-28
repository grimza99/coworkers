type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

export interface TaskDoneProp {
  description: string;
  doneAt: string;
  id: number;
  date: string;
}

export interface TaskDoneApiResponse extends TaskDoneProp {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: FrequencyType;
  name: string;
  recurringId: number;
  updatedAt: string;
}
