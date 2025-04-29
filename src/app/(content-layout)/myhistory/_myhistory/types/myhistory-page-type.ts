type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

export interface MyHistoryItemProps {
  description: string;
  doneAt: string;
  id: number;
  date: string;
}

export interface MyHistoryItem extends MyHistoryItemProps {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: FrequencyType;
  name: string;
  recurringId: number;
  updatedAt: string;
}
