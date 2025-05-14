'use client';

import CommentItem from '@/components/comment';
import { ArticleComment } from '@/components/comment/types';

const articleComments: ArticleComment[] = [
  {
    id: 1,
    content: '첫 번째 댓글',
    createdAt: '2025-05-14T10:00:00Z',
    updatedAt: '2025-05-14T10:00:00Z',
    writer: {
      id: 11,
      nickname: '유선향',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1844/IMG_0249.jpeg',
    },
  },
  {
    id: 2,
    content: '두 번째 댓글',
    createdAt: '2025-05-14T10:05:00Z',
    updatedAt: '2025-05-14T10:05:00Z',
    writer: {
      id: 22,
      nickname: '황혜진',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1844/이미지 2024. 1. 12. 15.07.jpeg',
    },
  },
  {
    id: 3,
    content: '세 번째 댓글',
    createdAt: '2025-05-14T10:10:00Z',
    updatedAt: '2025-05-14T10:15:00Z',
    writer: {
      id: 33,
      nickname: '강석준',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1844/IMG_3867.jpeg',
    },
  },
];

export default function CommentList() {
  return (
    <div className="flex flex-col gap-4">
      {articleComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onEdit={() => {}} onDelete={() => {}} />
      ))}
    </div>
  );
}
