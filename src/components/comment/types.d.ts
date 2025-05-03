import { User } from '@/types/user';

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface ArticleComment extends Omit<Comment, 'user'> {
  writer: User;
}

export type CommentApiResponse = Comment;

export type CommentsApiResponse = Comment[];

export type CommentCreateRequest = {
  content: Comment['content'];
};

export type CommentUpdateRequest = {
  content: Comment['content'];
};
