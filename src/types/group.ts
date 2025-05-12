import { Member } from '@/types/user';
import { Tasklist } from '@/types/tasklist';

export interface Group {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string; // 스프린트 팀 id를 가리킵니다.
}

export interface getGroupApiResponse extends Group {
  members: Member[];
  taskLists: Tasklist[];
}
