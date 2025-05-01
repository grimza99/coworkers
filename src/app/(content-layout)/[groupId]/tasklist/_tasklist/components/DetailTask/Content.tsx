import DropDown from '@/components/common/dropdown';
import { DetailTask } from '../../types/task-list-page-type';
import Image from 'next/image';
import ProfileBadge from '@/components/profile-badge';
import Repeat from '@/assets/Repeat';
import { format } from 'date-fns';
import clsx from 'clsx';

interface Props {
  task: DetailTask;
}
const DROPDOWN_OPTION_LIST = ['수정하기', '삭제하기'];

/**
 * @todo repeat 색상 바꾸기
 * 드롭다운 수정
 */

export default function Content({ task }: Props) {
  if (!task) return;
  const { name, doneBy, updatedAt, date, doneAt, description } = task;
  const isDone = Boolean(doneAt);

  const onDropdownListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const option = e.currentTarget.textContent;

    if (option === '수정하기') return;
    if (option === '삭제하기') return;
  };

  return (
    <section>
      {isDone && (
        <div className="flex items-center gap-1.5">
          <Image src="/icons/doneCheck.icon.svg" alt="체크" width={16} height={16} />
          <p className="text-tertiary text-xs-md">완료</p>
        </div>
      )}
      <div className="flex w-full justify-between">
        <h2 className={clsx('text-lg-bold md:text-xl-bold', isDone && 'line-through')}>{name}</h2>
        <DropDown
          onSelect={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onDropdownListClick(e);
          }}
          options={DROPDOWN_OPTION_LIST}
          size="md"
          dropDownOpenBtn={<Image src="/icons/kebab-icon.svg" width={24} height={24} alt="kebab" />}
          placement="top-4 -right-[14px]"
        />
      </div>
      <div className="flex justify-between">
        <ProfileBadge user={doneBy.user} />
        <p>{format(updatedAt, 'yyyy.MM.dd')}</p>
      </div>
      <div className="flex items-center gap-2.5 text-gray-500">
        <div className="flex items-center gap-1.5">
          <Image src="/icons/calendar.svg" alt="달력" width={16} height={16} />
          <p>{format(date, 'yyyy년 M월 dd일')}</p>
        </div>
        <div className="h-2 w-[1px] bg-gray-500" />
        <div className="flex items-center gap-1.5">
          <Repeat width="16" height="16" color="gray" />
          <p className="">매일 반복</p>
        </div>
      </div>
      <div>{description}</div>
    </section>
  );
}
