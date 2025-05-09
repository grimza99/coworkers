import Input from '@/components/common/formField/compound/Input';

export default function ArticleSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Input
      placeholder="검색어를 입력해주세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      borderClassName="border-bg100"
      leftSlot={<img src="/icons/search.svg" alt="검색 아이콘" width={24} height={24} />}
    />
  );
}
