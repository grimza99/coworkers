import ProgressDoneIcon from '@/../public/icons/progress-done-icon.svg';
import Image from 'next/image';

type TaskListProgressBadgeProps = {
  total: number;
  done: number;
};

export default function TaskListProgressBadge({ total, done }: TaskListProgressBadgeProps) {
  return (
    <div className="text-primary text-md-rg bg-bg300 flex items-center gap-1 rounded-xl px-2 py-1">
      <TaskListProgressIcon total={5} done={5} />
      {`${done}/${total}`}
    </div>
  );
}

type TaskListProgressIconProps = {
  total: number;
  done: number;
};

function TaskListProgressIcon({ total, done }: TaskListProgressIconProps) {
  if (total === done)
    return <Image src={ProgressDoneIcon} width={16} height={16} alt="모든 할 일 완료" />;

  const circumference = 2 * Math.PI * 5;
  const percent = total > 0 ? done / total : 0;
  const offset = circumference * (1 - percent);

  return (
    <svg width="16" height="16">
      {/* 배경 원 */}
      <circle cx="8" cy="8" r="5" stroke="#F8FAFC" strokeWidth="2" fill="none" />
      {/* 진행 원 */}
      <circle
        cx="8"
        cy="8"
        r="5"
        stroke="#10B981"
        strokeWidth="2"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 8 8)`} // 위에서 시작하게 회전
      />
    </svg>
  );
}
