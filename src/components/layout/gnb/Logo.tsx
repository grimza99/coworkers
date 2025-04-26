import Link from 'next/link';
import CoworkersLogo from '@/assets/CoworkersLogo.svg';

export default function Logo() {
  return (
    <Link href="/">
      <CoworkersLogo className="h-5 w-[102px] lg:h-8 lg:w-[158px]" />
    </Link>
  );
}
