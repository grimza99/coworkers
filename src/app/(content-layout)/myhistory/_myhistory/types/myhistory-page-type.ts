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
  frequency: string;
  name: string;
  recurringId: number;
  updatedAt: string;
}
