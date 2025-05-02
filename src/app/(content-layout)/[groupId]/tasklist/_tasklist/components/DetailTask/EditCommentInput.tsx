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
  onEditFalse: () => void;
}
export default function EditCommentInput({ taskId, comment, onEditFalse }: Props) {
  const [currentValue, setCurrentValue] = useState(comment.content);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    await axiosClient.patch(`/tasks/${taskId}/comments/${comment.id}`, { content: currentValue });
    onEditFalse();
    //수정후 바로 반영 해야함
    //수정 실패 했을때, 에러 핸들링
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
        <button className="text-gray500 text-sm-semi" onClick={onEditFalse}>
          취소
        </button>
        <Button onClick={handleSubmit} variant="ghost-primary" size="xs" fontSize="14">
          수정하기
        </Button>
      </div>
    </div>
  );
}
