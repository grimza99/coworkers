import Link from 'next/link';
import kebabIcon from '@/../public/icons/kebab-icon.svg';
import Image from 'next/image';

interface Props {
  image: string;
  id: number;
  name: string;
}

export default function DropDownGroupsItem({ image, id, name }: Props) {
  return (
    <Link className="cursor-pointer" href={`/${id}`}>
      <div>
        <img src={image} className="h-8 w-8 rounded-md" />
        {name}
        <Link href={`/${id}/edit`}>
          <Image width={2} height={8} src={kebabIcon} alt=":" />
        </Link>
      </div>
    </Link>
  );
}
