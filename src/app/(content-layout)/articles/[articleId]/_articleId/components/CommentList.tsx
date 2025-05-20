'use client';

import { useState } from 'react';
import Textarea from '@/components/common/formField/compound/Textarea';
import Button from '@/components/common/Button';
import DangerModal from '@/components/DangerModal';
import { Toast } from '@/components/common/Toastify';
import CommentItem from '@/components/comment';
import { ArticleComment } from '@/components/comment/types';
import useModalContext from '@/components/common/modal/core/useModalContext';

import { deleteArticleComment } from '../action';

export default function CommentList({
  comments,
  articleId,
}: {
  comments: ArticleComment[];
  articleId: number;
}) {
  const [commentIdToDelete, setCommentIdToDelete] = useState<number | null>(null);
  const [commentIdToEdit, setCommentIdToEdit] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { openModal } = useModalContext();

  const deleteCommentModalId = `delete-comment-${commentIdToDelete}`;

  const deleteComment = () => {
    if (commentIdToDelete === null) return;

    setIsPending(true);

    deleteArticleComment(articleId, commentIdToDelete)
      .catch(() => Toast.error('댓글 삭제 실패'))
      .finally(() => setIsPending(false));
  };

  const checkDropdownOpen = (commentId: number) => {
    setCommentIdToDelete(commentId);
  };

  return (
    <div className="mb-10 flex flex-col gap-4">
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {commentIdToEdit === comment.id ? (
              <div className="bg-bg200 flex flex-col gap-8 rounded-lg p-4 md:px-6 md:py-5">
                <Textarea value={comment.content} isBorder={false} />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setCommentIdToEdit(null)}
                    className="text-gray500 text-md-semi w-fit px-3"
                  >
                    취소
                  </button>
                  <Button size="xs" variant="ghost-primary" fontSize="14">
                    수정하기
                  </Button>
                </div>
              </div>
            ) : (
              <CommentItem
                key={comment.id}
                comment={comment}
                onEdit={() => setCommentIdToEdit(comment.id)}
                onDelete={() => openModal(deleteCommentModalId)}
                checkDropdownOpen={() => checkDropdownOpen(comment.id)}
              />
            )}
          </div>
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
