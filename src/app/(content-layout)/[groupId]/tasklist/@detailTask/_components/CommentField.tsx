'use client';
import CommentItem from '@/components/comment';
import { Comment } from '@/components/comment/types';
import { useState } from 'react';
import EditCommentInput from './EditCommentInput';
import axiosClient from '@/lib/axiosClient';
import { useModal } from '@/contexts/ModalContext';
import RemoveCommentModal from '../../_tasklist/components/ModalContents/RemoveCommentModal';
import { Toast } from '@/components/common/Toastify';
import { revalidateTasks } from '../../_tasklist/actions/task-actions';
import { BFF_API } from '@/constants/api';

interface Props {
  comment: Comment;
  taskId: number;
}

export default function CommentField({ comment, taskId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { openModal } = useModal();
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
    try {
      const res = await axiosClient.delete(
        BFF_API.task.comment.delete(String(taskId), String(comment.id))
      );
      if (res.status === 200) {
        Toast.success('댓글 삭제 성공');
      }
      setIsDelete(true);
      revalidateTasks();
    } catch {
      Toast.error('댓글 삭제 실패');
    }
  };

  const deleteCommentModalPopUp = () => {
    openModal(deleteCommentModalId);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.currentTarget.value);
  };

  const editComment = async () => {
    try {
      await axiosClient.patch(BFF_API.task.comment.edit(String(taskId), String(comment.id)), {
        content: currentContent,
      });
      setCurrentComment((prev) => ({ ...prev, content: currentContent }));
      onEditCancel();
    } catch (err) {
      console.error(err);
      Toast.error('댓글 수정 실패');
    }
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
