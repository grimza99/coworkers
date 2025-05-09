import { User } from './user';

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  writer: Pick<User, 'id' | 'nickname'>;
}
