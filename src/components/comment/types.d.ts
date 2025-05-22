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

export interface ArticleComments {
  list: ArticleComment[];
  nextCursor: number | null;
}

export type CommentApiResponse = Comment;

export type CommentsApiResponse = Comment[];

export type CommentCreateRequest = {
  content: Comment['content'];
};

export type CommentUpdateRequest = {
  content: Comment['content'];
};
