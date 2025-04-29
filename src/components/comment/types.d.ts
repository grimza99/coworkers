export interface User {
  id: number;
  nickname: string;
  image: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export type CommentApiResponse = Comment;

export type CommentsApiResponse = Comment[];

export type CommentCreateRequest = {
  content: Comment['content'];
};

export type CommentUpdateRequest = {
  content: Comment['content'];
};
