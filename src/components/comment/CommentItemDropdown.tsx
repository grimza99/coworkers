'use client';
import Image from 'next/image';
import DropDown from '@/components/common/dropdown';
import kebabIcon from '@/../public/icons/kebab-icon.svg';

const ITEM_DROPDOWN_VALUE = ['수정하기', '삭제하기'];

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}
// @TODO: 메뉴 선택 시 동작 추가
export default function CommentItemDropdown({ onEdit, onDelete }: Props) {
  const handleClickDropdownOption = (e: React.MouseEvent) => {
    const option = e.currentTarget.textContent;

    if (option === '수정하기') return onEdit?.();
    if (option === '삭제하기') return onDelete?.();
  };

  return (
    <DropDown
      size="md"
      dropDownOpenBtn={
        <button>
          <Image width="16" height="16" src={kebabIcon} alt={'메뉴 열기'} />
        </button>
      }
      options={ITEM_DROPDOWN_VALUE}
      onSelect={handleClickDropdownOption}
      placement="top-4 right-3"
    />
  );
}
