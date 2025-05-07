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
 * 1. editComment 에러 핸들링
 */
export default function CommentField({ comment, taskId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { openModal } = useModalContext();
  const [currentComment, setCurrentComment] = useState(comment);
  const [currentContent, setCurrentContent] = useState(comment.content);

  const deleteCommentModalId = `${comment.id}-delete-comment`;

  const onEdit = () => {
    setIsEdit(true);
  };
  const onEditCancel = () => {
    setIsEdit(false);
  };

  const deleteComment = async () => {
    await axiosClient.delete(`/tasks/${taskId}/comments/${comment.id}`);
    setIsDelete(true);
  };

  const deleteCommentModalPopUp = () => {
    openModal(deleteCommentModalId);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.currentTarget.value);
  };

  const editComment = async () => {
    await axiosClient.patch(`/tasks/${taskId}/comments/${comment.id}`, {
      content: currentContent,
    });
    setCurrentComment((prev) => ({ ...prev, content: currentContent }));
    onEditCancel();
  };

  return (
    <>
      {isEdit ? (
        <EditCommentInput
          editComment={editComment}
          onChange={handleChangeComment}
          onEditCancel={onEditCancel}
          currentContent={currentContent}
        />
      ) : (
        <>
          {!isDelete && (
            <>
              <CommentItem
                key={comment.id}
                comment={currentComment}
                onDelete={deleteCommentModalPopUp}
                onEdit={onEdit}
              />
              <RemoveCommentModal modalId={deleteCommentModalId} onDelete={deleteComment} />
            </>
          )}
        </>
      )}
    </>
  );
}
