import Image from 'next/image';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import { Comment } from './types';
import { formatTimeDistance } from '@/utils/date';
import ProfileBadge from '../profile-badge';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { content, updatedAt, user } = comment;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="text-md-rg break-keep whitespace-pre-wrap">{content}</div>
        <button className="shrink-0">
          <Image width="16" height="16" src={kebabIcon} alt={'메뉴 열기'} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <ProfileBadge user={user} />
        <div className="text-md-rg">{formatTimeDistance(updatedAt)}</div>
      </div>
    </div>
  );
}
