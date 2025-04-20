import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <div className="w-1920px bg-bg200">
        <Image src="/assets/logo-lg.png" alt="로고" width={158} height={32} />
      </div>
    </header>
  );
}
