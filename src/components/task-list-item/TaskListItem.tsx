import clsx from 'clsx';
import Image from 'next/image';
import DropDown from '../common/dropdown';

// 매일 반복 클릭하면 색상 primary 컬러로 바뀌도록 : svgr 추가되면 작업 예정
// onEdit, onDelete, onCheckStatusChange 파라미터 지정 필요

interface TaskListItemProps {
  type: 'history' | 'taskList';
  onCheckStatusChange?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isDone: boolean;
  description: string;
  commentCount?: number;
  date?: string;
  frequency?: string;
}

const DROPDOWN_OPTION_LIST = ['수정하기', '삭제하기'];

export default function TaskListItem({
  type = 'taskList',
  onCheckStatusChange,
  onEdit,
  onDelete,
  isDone = true,
  description = '이것저것 다 하기',
  commentCount = 3,
  date = '2025년 04월 23일',
  frequency = 'DAILY',
}: TaskListItemProps) {
  const checkIcon = isDone ? '/icons/check-box.svg' : '/icons/none-check-box.svg';

  const onDropdownListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const option = e.currentTarget.textContent;

    if (option === '수정하기') return onEdit?.();
    if (option === '삭제하기') return onDelete?.();
  };

  function taskDescription() {
    return (
      <div className="flex shrink-0 items-center justify-start gap-2">
        <Image
          src={checkIcon}
          onClick={onCheckStatusChange}
          width={24}
          height={24}
          alt="checked"
          className="cursor-pointer"
        />
        <span className={clsx('text-md-rg text-gray100 pt-0.5', isDone && 'line-through')}>
          {description}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-bg200 flex w-full flex-col gap-2.5 rounded-lg px-[14px] py-3">
      {type === 'history' ? (
        taskDescription()
      ) : (
        <>
          <div className="flex justify-between sm:gap-3">
            {taskDescription()}
            <div className="flex items-center gap-2 sm:w-full sm:justify-between">
              <div className="flex items-center gap-0.5">
                <Image src="/icons/comment.svg" width={16} height={16} alt="comment" />
                <span className="text-xs-rg text-gray500 pt-0.5">{commentCount}</span>
              </div>

              <DropDown
                onSelect={onDropdownListClick}
                options={DROPDOWN_OPTION_LIST}
                size="md"
                dropDownOpenBtn={
                  <Image src="/icons/kebab-icon.svg" width={16} height={16} alt="kebab" />
                }
                placement="top-4 -right-[14px]"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-1.5">
              <Image src="/icons/calendar.svg" width={16} height={16} alt="calendar" />
              <span className="text-xs-rg text-gray500 pt-0.5">{date}</span>
            </div>

            <div className="bg-bg100 mx-2.5 h-2 w-0.25" />

            <div className="flex cursor-pointer items-center gap-1.5">
              <div className="bg-bg100 h-4 w-4" />
              <span
                className={clsx(
                  'text-xs-rg pt-0.5',
                  frequency === 'DAILY' ? 'text-primary' : 'text-gray500'
                )}
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
