import DropDown from '@/components/common/dropdown';
import { Task } from '../../types/task-list-page-type';
import Image from 'next/image';
import ProfileBadge from '@/components/profile-badge';
import Repeat from '@/assets/Repeat';

interface Props {
  task: Task;
}
const DROPDOWN_OPTION_LIST = ['수정하기', '삭제하기'];

/**
 * @todo updatedAt, doneAt 날짜 포맷팅 하기
 *repeat 색상 바꾸기
 */
export default function Content({ task }: Props) {
  const { name, doneBy, updatedAt, doneAt, description } = task;
  const onDropdownListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const option = e.currentTarget.textContent;

    if (option === '수정하기') return;
    if (option === '삭제하기') return;
  };
  return (
    <section>
      <div className="flex w-full justify-between">
        <h2 className="text-lg-bold md:text-xl-bold">{name}</h2>
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
        <p>{updatedAt}</p>
      </div>
      <div className="flex items-center gap-2.5 text-gray-500">
        <div className="flex items-center gap-1.5">
          <Image src="/icons/calendar.svg" alt="달력" width={16} height={16} />
          <p>{doneAt}</p>
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
