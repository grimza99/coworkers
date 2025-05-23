'use client';
import Image from 'next/image';
import DropDown from '@/components/common/dropdown';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import { Tasklist } from '@/types/tasklist';
import useModalContext from '@/components/common/modal/core/useModalContext';

const ITEM_DROPDOWN_VALUE = ['수정하기', '삭제하기'];

type TasklistItemDropdownProps = {
  onTriggerClick: () => void;
  tasklist: Tasklist;
};

export default function TasklistItemDropdown({
  onTriggerClick,
  tasklist,
}: TasklistItemDropdownProps) {
  const { openModal } = useModalContext();
  return (
    <div>
      <DropDown
        size="md"
        dropDownOpenBtn={
          <button>
            <Image
              onClick={onTriggerClick}
              width="16"
              height="16"
              src={kebabIcon}
              alt={'메뉴 열기'}
              className="size-5"
            />
          </button>
        }
        options={ITEM_DROPDOWN_VALUE}
        onSelect={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.currentTarget.textContent === '수정하기') {
            openModal(`tasklistUpdate-${tasklist.id}`);
          } else if (e.currentTarget.textContent === '삭제하기') {
            openModal(`tasklistDelete-${tasklist.id}`);
          }
        }}
        placement="right-0"
      />
    </div>
  );
}
