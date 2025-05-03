'use client';
import { Comment } from '@/components/comment/types';
import Button from '@/components/common/Button';
import { COMMON_TEXTFIELD_STYLE } from '@/components/common/formField/style';
import axiosClient from '@/lib/axiosClient';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  taskId: number;
  comment: Comment;
  onEditCancel: () => void;
}

/**
 * @todo
 * 1. editComment 에러 핸들링
 * 2. 수정후 화면 바로 반영
 */
export default function EditCommentInput({ taskId, comment, onEditCancel }: Props) {
  const [currentValue, setCurrentValue] = useState(comment.content);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.currentTarget.value);
  };

  const editComment = async () => {
    await axiosClient.patch(`/tasks/${taskId}/comments/${comment.id}`, { content: currentValue });
    onEditCancel();
  };

  return (
    <div className="relative flex flex-col pb-4">
      <textarea
        className={(clsx('h-fit min-h-8 w-full resize-none'), COMMON_TEXTFIELD_STYLE)}
        value={currentValue}
        onChange={handleChangeComment}
        name="content"
      />
      <div className="absolute right-0 bottom-0 flex gap-2">
        <button className="text-gray500 text-sm-semi" onClick={onEditCancel}>
          취소
        </button>
        <Button onClick={editComment} variant="ghost-primary" size="xs" fontSize="14">
          수정하기
        </Button>
      </div>
    </div>
  );
}
