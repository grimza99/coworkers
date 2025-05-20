'use client';

import { useState } from 'react';
import CommentItem from '@/components/comment';
import { ArticleComment } from '@/components/comment/types';
import useModalContext from '@/components/common/modal/core/useModalContext';
import DangerModal from '@/components/DangerModal';
import { Toast } from '@/components/common/Toastify';
import { deleteArticleComment } from '../action';

export default function CommentList({
  comments,
  articleId,
}: {
  comments: ArticleComment[];
  articleId: number;
}) {
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { openModal } = useModalContext();

  const deleteCommentModalId = `delete-comment-${selectedCommentId}`;

  const deleteComment = () => {
    if (selectedCommentId === null) return;

    setIsPending(true);

    deleteArticleComment(articleId, selectedCommentId)
      .catch(() => Toast.error('댓글 삭제 실패'))
      .finally(() => setIsPending(false));
  };

  const checkDropdownOpen = (commentId: number) => {
    setSelectedCommentId(commentId);
  };

  return (
    <div className="mb-10 flex flex-col gap-4">
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEdit={() => {}}
            onDelete={() => {
              openModal(deleteCommentModalId);
            }}
            checkDropdownOpen={() => checkDropdownOpen(comment.id)}
          />
        );
      })}
      <DangerModal
        modalId={deleteCommentModalId}
        heading="댓글을 삭제하시겠어요?"
        confirmButton={isPending ? '...' : '삭제하기'}
        onConfirm={deleteComment}
        disabled={isPending}
      />
    </div>
  );
}
