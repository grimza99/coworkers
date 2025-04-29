import { Comment } from './types';
import { formatTimeDistance } from '@/utils/date';
import ProfileBadge from '@/components/profile-badge';
import CommentItemDropdown from './CommentItemDropdown';

interface CommentItemProps {
  comment: Comment;
}

// @TODO: 자유게시판 댓글 UI 추가해야함.
export default function CommentItem({ comment }: CommentItemProps) {
  const { content, updatedAt, user } = comment;
  return (
    <div className="border-b-border flex flex-col gap-4 border-b-2 pb-4">
      <div className="flex items-start justify-between">
        <div className="text-md-rg break-keep whitespace-pre-wrap">{content}</div>
        <CommentItemDropdown />
      </div>
      <div className="flex items-center justify-between gap-4">
        <ProfileBadge user={user} />
        <div className="text-md-rg">{formatTimeDistance(updatedAt)}</div>
      </div>
    </div>
  );
}
