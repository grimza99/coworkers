import Link from 'next/link';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import Image from 'next/image';

interface DropDownGroupItemPropsType {
  group: Group;
}
export default function DropDownGroupsItem({ group }: DropDownGroupItemPropsType) {
  const { name, image, id } = group;

  return (
    <div className="hover:bg-bg100 flex w-[186px] cursor-pointer items-center justify-between rounded-lg px-[8px] py-[7px]">
      <Link className="text-lg-md text-gray400 flex items-center gap-3" href={`/${id}`}>
        <img src={image} className="h-8 w-8 rounded-md" />
        <p className="w-[110px] truncate overflow-hidden whitespace-nowrap"> {name}</p>
      </Link>
      <Link href={`/${id}/edit`}>
        <Image width={16} height={16} src={kebabIcon} alt=":" />
      </Link>
    </div>
  );
}
