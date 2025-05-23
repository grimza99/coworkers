'use client';

import { useTransition, useState } from 'react';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import { Toast } from '@/components/common/Toastify';
import BouncingDots from '@/components/common/loading/BouncingDots';
import { postArticleCommentsAction } from '../action';

export default function CommentField({ articleId }: { articleId: number }) {
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();

  const postComment = () => {
    startTransition(() => {
      postArticleCommentsAction(articleId, comment)
        .then(() => {
          setComment('');
        })
        .catch(() => Toast.error('댓글 생성 실패'));
    });
  };

  return (
    <div className="flex flex-col items-end gap-4">
      <FormField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        field="textarea"
        label="댓글달기"
        placeholder="댓글을 입력해 주세요."
        gapSize="24"
        height={104}
      />
      <Button
        onClick={postComment}
        disabled={isPending || !comment.trim()}
        variant="solid"
        size="xs"
        className="sm:h-12 sm:w-46"
      >
        {isPending ? <BouncingDots /> : '등록'}
      </Button>
    </div>
  );
}
