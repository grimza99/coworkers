import ProgressDoneIcon from '@/../public/icons/progress-done-icon.svg';
import Image from 'next/image';

type TaskListProgressBadgeProps = {
  total: number;
  done: number;
};

export default function TaskListProgressBadge({ total, done }: TaskListProgressBadgeProps) {
  return (
    <div className="text-primary text-md-rg bg-bg300 flex items-center gap-1 rounded-xl px-2 py-1">
      <TaskListProgressIcon total={total} done={done} />
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

  const SIZE = 16; // 아이콘 크기
  const CENTER = SIZE / 2; // 원의 중심
  const RADIUS = 5; // 원의 반지름
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // 원의 둘레

  const percent = total > 0 ? done / total : 0;
  const offset = CIRCUMFERENCE * (1 - percent);

  return (
    <svg width={SIZE} height={SIZE}>
      {/* 배경 원 */}
      <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="#F8FAFC" strokeWidth="2" fill="none" />
      {/* 진행 원 */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        stroke="#10B981"
        strokeWidth="2"
        fill="none"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${CENTER} ${CENTER})`} // 위에서 시작하게 회전
      />
    </svg>
  );
}
