'use client';
import CommentItem from '@/components/comment';
import { Comment } from '@/components/comment/types';
import { useState } from 'react';
import EditCommentInput from './EditCommentInput';
import axiosClient from '@/lib/axiosClient';

interface Props {
  comment: Comment;
  taskId: number;
}
export default function CommentField({ comment, taskId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const editComment = () => {
    setIsEdit(true);
  };
  const deleteComment = async () => {
    await axiosClient.delete(`/tasks/${taskId}/comments/${comment.id}`);
    //삭제 실패시 에러 핸들링
    //화면 바로 반영 필요
  };

  const onEditFalse = () => {
    setIsEdit(false);
  };
  return (
    <>
      {isEdit ? (
        <EditCommentInput comment={comment} onEditFalse={onEditFalse} taskId={taskId} />
      ) : (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={deleteComment}
          onEdit={editComment}
        />
      )}
    </>
  );
}
