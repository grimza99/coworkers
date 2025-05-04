import Image from 'next/image';

interface Props {
  variant: 'done' | 'total';
  count: number;
}
export default function TaskCount({ variant, count }: Props) {
  const title = variant === 'done' ? '한 일' : '오늘의 할 일';

  const image =
    variant === 'done'
      ? '/icons/groupIdPage/done-task-icon.svg'
      : '/icons/groupIdPage/total-task-icon.svg';

  return (
    <div className="bg-bg100 flex h-20 max-h-100 w-full items-center justify-between rounded-xl px-4 py-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs-md text-gray-300">{title}</p>
        <p className="text-tertiary text-2xl-bold">{count}개</p>
      </div>
      <Image src={image} alt="이미지" width={40} height={40} />
    </div>
  );
}
