'use client';
import CommentSlot from '@/assets/CommentSlot';
import CommentItem from '@/components/comment';
import { Comment } from '@/components/comment/types';
import FormField from '@/components/common/formField';
import { useState } from 'react';

//color 변경

interface Props {}
export default function DetailTaskCommentField({}: Props) {
  const [commentValue, setCommentValue] = useState('');

  const comments: Comment[] = [];

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const handleSubmitComment = () => {
    //댓글 등록
  };
  return (
    <div>
      <FormField
        rightSlot={
          <CommentSlot
            className="text-primary absolute top-[calc(50%-12px)] right-0 cursor-pointer"
            onClick={handleSubmitComment}
            color="#10b981"
          />
        }
        className="border-border text-md-rg h-fit min-h-15 border-t-1 border-b-1 px-8 py-3"
        isBorder={false}
        field="textarea"
        label=""
        onChange={handleChangeComment}
        placeholder="댓글을 달아주세요"
      />
      {comments.map((comment: Comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
}
