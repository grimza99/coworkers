import clsx from 'clsx';
import Image from 'next/image';

// 매일 반복 클릭하면 색상 primary 컬러로 바뀌도록 : svgr 추가되면 작업 예정
// history kebab

interface TaskListItemProps {
  type: 'history' | 'taskList';
  onCheckStatusChange: () => void;
  isDone: boolean;
  description: string;
  commentCount?: number;
  date?: string;
  frequency?: string;
}

export default function TaskListItem({
  type = 'history',
  onCheckStatusChange,
  isDone = true,
  description = '이것저것 다 하기',
  commentCount = 3,
  date = '2025년 04월 23일',
  frequency = 'DAILY',
}: TaskListItemProps) {
  const checkIcon = isDone ? '/icons/check-box.svg' : '/icons/none-check-box.svg';

  function taskDescription() {
    return (
      <div className="flex w-fit items-center justify-start gap-2">
        <Image src={checkIcon} width={24} height={24} alt="checked" className="cursor-pointer" />
        <span className={clsx('text-md-rg text-gray100 pt-0.5', isDone && 'line-through')}>
          {description}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-bg200 text-xs-rg text-gray500 flex w-full flex-col gap-2.5 rounded-lg px-[14px] py-3">
      {type === 'history' ? (
        taskDescription()
      ) : (
        <>
          <div className="flex justify-between">
            {taskDescription()}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  src="/icons/comment.svg"
                  width={16}
                  height={16}
                  onClick={onCheckStatusChange}
                  alt="comment"
                />
                <span className="pt-0.5">{commentCount}</span>
              </div>
              <Image
                src="/icons/kebab-icon.svg"
                width={16}
                height={16}
                alt="kebab"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-1.5">
              <Image src="/icons/calendar.svg" width={16} height={16} alt="calendar" />
              <span className="pt-0.5">{date}</span>
            </div>
            <div className="bg-bg100 mx-2.5 h-2 w-0.25" />
            <div className="flex items-center gap-1.5">
              <div className="bg-bg100 h-4 w-4" />
              <span
                className={clsx('pt-0.5', frequency === 'DAILY' ? 'text-primary' : 'text-gray500')}
              >
                매일 반복
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
