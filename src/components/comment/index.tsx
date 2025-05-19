import { ArticleComment, Comment } from './types';
import { formatTimeDistance } from '@/utils/date';
import ProfileBadge from '@/components/profile-badge';
import CommentItemDropdown from './CommentItemDropdown';
import { User } from '@/types/user';

interface CommentItemProps {
  comment: Comment | ArticleComment;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CommentItem({ comment, onEdit, onDelete }: CommentItemProps) {
  if (!comment) return;
  const { content, updatedAt } = comment;

  const userObject =
    'user' in comment ? comment.user : 'writer' in comment ? comment.writer : ({} as User);
  const variant = 'user' in comment ? 'default' : 'article';

  return (
    <div className={COMMENT_STYLES.container[variant]}>
      <div className="flex items-start justify-between">
        <div className="text-md-rg break-words whitespace-pre-wrap">{content}</div>
        <div className="shrink-0">
          <CommentItemDropdown onDelete={onDelete} onEdit={onEdit} />
        </div>
      </div>
      <div className={COMMENT_STYLES.metaContainer[variant]}>
        <ProfileBadge user={userObject} />
        <div className={COMMENT_STYLES.timeWrapper[variant]}>{formatTimeDistance(updatedAt)}</div>
      </div>
    </div>
  );
}

const COMMENT_STYLES = {
  container: {
    default: 'border-b-border flex flex-col gap-4 border-b-2 pb-4',
    article: 'bg-bg200 flex flex-col gap-8 rounded-lg p-4 md:px-6 md:py-5',
  },
  timeWrapper: {
    default: 'text-md-rg',
    article: 'text-md-rg border-l-bg100 text-gray400 border-l-2 pl-4',
  },
  metaContainer: {
    default: 'flex items-center justify-between gap-4',
    article: 'flex items-center justify-start gap-4',
  },
};
