import Link from 'next/link';
import LogoLg from '@/assets/logo-lg.svg';
import LogoSm from '@/assets/logo-sm.svg';

export default function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center">
        <LogoLg className="hidden lg:block" />
        <LogoSm className="block lg:hidden" />
      </Link>
    </div>
  );
}
