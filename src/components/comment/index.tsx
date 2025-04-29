import Image from 'next/image';
import Profile from '@/assets/Profile';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import { Comment } from './types';
import { formatTimeDistance } from '@/utils/date';

export default function CommentItem({ comment }: { comment: Comment }) {
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
        <div className="flex shrink-0 items-center gap-3">
          <Profile width="32" height="32" />
          <div className="text-md-md">{user.nickname}</div>
        </div>
        <div className="text-md-rg">{formatTimeDistance(updatedAt)}</div>
      </div>
    </div>
  );
}
