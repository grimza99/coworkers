import DropDown from '@/components/common/dropdown';

export default function KebabDropDown() {
  return (
    <DropDown
      options={['수정하기', '삭제하기']}
      size="sm"
      placement=" right-0"
      onSelect={(e) => {
        const selected = e.currentTarget.textContent;
        if (selected === '수정하기') {
          // TODO: 수정하기 로직
        } else if (selected === '삭제하기') {
          // TODO: 삭제하기 로직
        }
      }}
      dropDownOpenBtn={
        <img
          width={24}
          height={24}
          src="icons/kebab-icon.svg"
          alt="옵션"
          className="cursor-pointer"
        />
      }
    />
  );
}
