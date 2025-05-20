'use client';

import { useState } from 'react';
import Textarea from '@/components/common/formField/compound/Textarea';
import Button from '@/components/common/Button';
import DangerModal from '@/components/danger-modal';
import { Toast } from '@/components/common/Toastify';
import CommentItem from '@/components/comment';
import { ArticleComment } from '@/components/comment/types';
import useModalContext from '@/components/common/modal/core/useModalContext';
import { deleteArticleComment, patchArticleComment } from '../action';
import { validateEmptyValue } from '@/utils/validators';

export default function CommentList({
  comments,
  articleId,
}: {
  comments: ArticleComment[];
  articleId: number;
}) {
  const [commentIdToDelete, setCommentIdToDelete] = useState<number | null>(null);
  const [commentToEdit, setCommentToEdit] = useState<{ id: number; content: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { openModal } = useModalContext();

  const deleteComment = () => {
    if (commentIdToDelete === null) return;

    setIsPending(true);

    deleteArticleComment(articleId, commentIdToDelete)
      .then(() => setCommentIdToDelete(null))
      .catch(() => Toast.error('댓글 삭제 실패'))
      .finally(() => setIsPending(false));
  };

  const editComment = (commentId: number, comment: string, editComment: string) => {
    if (commentToEdit === null) return;

    if (comment === editComment) {
      Toast.info('변경 사항이 없습니다');
      return;
    }

    setIsPending(true);

    patchArticleComment(articleId, commentId, editComment)
      .then(() => setCommentToEdit(null))
      .catch(() => Toast.error('댓글 수정 실패'))
      .finally(() => setIsPending(false));
  };

  const deleteCommentModalId = `delete-comment-${commentIdToDelete}`;

  return (
    <div className="mb-10 flex flex-col gap-4">
      {comments.map((comment) => {
        const isEdit = commentToEdit?.id === comment.id;

        return (
          <div key={comment.id}>
            {isEdit ? (
              <div className="bg-bg200 flex flex-col rounded-lg p-4 md:px-6 md:py-5">
                <Textarea
                  value={commentToEdit?.content}
                  onChange={(e) => {
                    setCommentToEdit((prev) =>
                      prev ? { ...prev, content: e.target.value } : prev
                    );
                  }}
                  isBorder={false}
                  height={56}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setCommentToEdit(null)}
                    className="text-gray500 text-md-semi w-fit px-3"
                  >
                    취소
                  </button>
                  <Button
                    onClick={() => editComment(comment.id, comment.content, commentToEdit.content)}
                    disabled={isPending || validateEmptyValue(commentToEdit?.content)}
                    size="xs"
                    variant="ghost-primary"
                    fontSize="14"
                  >
                    {isPending ? '...' : '수정하기'}
                  </Button>
                </div>
              </div>
            ) : (
              <CommentItem
                key={comment.id}
                comment={comment}
                onEdit={() => setCommentToEdit({ id: comment.id, content: comment.content })}
                onDelete={() => openModal(deleteCommentModalId)}
                checkDropdownOpen={() => setCommentIdToDelete(comment.id)}
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
