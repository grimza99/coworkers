import Link from 'next/link';
import CoworkersLogo from '@/assets/CoworkersLogo.svg';

export default function Logo() {
  return (
<<<<<<< HEAD
    <div className="h-5 w-[102px] lg:h-8 lg:w-[158px]">
      <Link href="/">
        <CoworkersLogo />
      </Link>
    </div>
=======
    <Link href="/">
      <CoworkersLogo className="h-5 w-[102px] lg:h-8 lg:w-[158px]" />
    </Link>
>>>>>>> 86c7a4e8c86188b08f33bc826d16c1b240afdcb4
  );
}
