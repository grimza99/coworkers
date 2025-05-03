'use client';
import CommentItem from '@/components/comment';
import { Comment } from '@/components/comment/types';
import { useState } from 'react';
import EditCommentInput from './EditCommentInput';
import axiosClient from '@/lib/axiosClient';
import RemoveCommentModal from '../ModalContents/RemoveCommentModal';
import useModalContext from '@/components/common/modal/core/useModalContext';

interface Props {
  comment: Comment;
  taskId: number;
}

/**
 * @todo
 * 1. deleteComment 에서 삭제 실패시 에러 핸들링
 * 2. 삭제후 화면 바로 반영
 */
export default function CommentField({ comment, taskId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const { openModal } = useModalContext();

  const deleteCommentModalId = `${taskId}-delete-comment`;

  const editComment = () => {
    setIsEdit(true);
  };
  const deleteComment = async () => {
    await axiosClient.delete(`/tasks/${taskId}/comments/${comment.id}`);
  };

  const deleteCommentModalPopUp = () => {
    openModal(deleteCommentModalId);
  };

  const onEditCancel = () => {
    setIsEdit(false);
  };
  return (
    <>
      {isEdit ? (
        <EditCommentInput comment={comment} onEditCancel={onEditCancel} taskId={taskId} />
      ) : (
        <>
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={deleteCommentModalPopUp}
            onEdit={editComment}
          />
          <RemoveCommentModal modalId={deleteCommentModalId} onDelete={deleteComment} />
        </>
      )}
    </>
  );
}
