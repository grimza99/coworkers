import Link from 'next/link';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import Image from 'next/image';

interface GroupOptionProps {
  group: GroupApiResponse;
}

export default function DropDownGroupsItem({ group }: GroupOptionProps) {
  const { name, image, id } = group;

  return (
    <div className="hover:bg-bg100 flex w-[186px] cursor-pointer items-center justify-between rounded-lg px-2 py-[7px]">
      <Link className="text-lg-md text-gray400 flex items-center gap-3" href={`/${id}`}>
        <Image src={image} width={32} height={32} alt="이미지" className="rounded-md" />
        <p className="w-[110px] truncate"> {name}</p>
      </Link>
      <Link href={`/${id}/edit`}>
        <Image width={16} height={16} src={kebabIcon} alt=":" />
      </Link>
    </div>
  );
}
