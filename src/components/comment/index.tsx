import { ArticleComment, Comment } from './types';
import { formatTimeDistance } from '@/utils/date';
import ProfileBadge from '@/components/profile-badge';
import CommentItemDropdown from './CommentItemDropdown';

interface CommentItemProps {
  comment: Comment;
}

interface ArticleCommentItemProps {
  comment: ArticleComment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { content, updatedAt, user } = comment;
  return (
    <div className="border-b-border flex flex-col gap-4 border-b-2 pb-4">
      <div className="flex items-start justify-between">
        <div className="text-md-rg break-keep whitespace-pre-wrap">{content}</div>
        <div className="shrink-0">
          <CommentItemDropdown />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <ProfileBadge user={user} />
        <div className="text-md-rg">{formatTimeDistance(updatedAt)}</div>
      </div>
    </div>
  );
}

export function ArticleCommentItem({ comment }: ArticleCommentItemProps) {
  const { content, updatedAt, writer } = comment;
  return (
    <div className="bg-bg200 flex flex-col gap-8 rounded-lg p-4 md:px-6 md:py-5">
      <div className="flex items-start justify-between">
        <div className="text-md-rg break-keep whitespace-pre-wrap">{content}</div>
        <div className="shrink-0">
          <CommentItemDropdown />
        </div>
      </div>
      <div className="flex items-center justify-start gap-4">
        <ProfileBadge user={writer} />
        <div className="text-md-rg border-l-bg100 text-gray400 border-l-2 pl-4">
          {formatTimeDistance(updatedAt)}
        </div>
      </div>
    </div>
  );
}
