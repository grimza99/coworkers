// @FIXME: User 타입은 여기저기 쓰이는 타입인데, 어디에 정리해놓으면 좋을까요?
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
