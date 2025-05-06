export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  // TODO: 아래 구체적인 내용 수정 필요
  doneAt: string | null;
  updatedAt: string;
  // user: null;
  // recurringId: 5253;
  // deletedAt: null;
  // displayIndex: 0;
  // writer: {
  //   id: 1841;
  //   nickname: string;
  //   image: null;
  // };
  // doneBy: {
  //   user: null;
  // };
  // commentCount: 0;
  // frequency: 'WEEKLY';
}
