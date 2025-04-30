'use client';
import Image from 'next/image';
import DropDown from '@/components/common/dropdown';
import kebabIcon from '@/../public/icons/kebab-icon.svg';

const ITEM_DROPDOWN_VALUE = ['수정하기', '삭제하기'];

// @TODO: 메뉴 선택 시 동작 추가
export default function CommentItemDropdown() {
  return (
    <DropDown
      size="md"
      dropDownOpenBtn={
        <button>
          <Image width="16" height="16" src={kebabIcon} alt={'메뉴 열기'} />
        </button>
      }
      options={ITEM_DROPDOWN_VALUE}
      onSelect={() => {}}
      placement=""
    />
  );
}
