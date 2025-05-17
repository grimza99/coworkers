import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import PATHS from '@/constants/paths';

export default function Page() {
  return (
    <main className="flex h-[calc(100vh-92px)] flex-col items-center justify-center gap-12 md:gap-20">
      <div>
        <Image
          width={2430}
          height={765}
          src="/images/nogroup-main.png"
          alt="협업하는 사람들의 모습이 표현된 메인 일러스트레이션"
          priority
          className="mb-8 w-78 md:mb-12 md:w-130 lg:w-202.5"
        />
        <h1 className="text-sm-md md:text-lg-md text-gray500 text-center">
          아직 소속된 팀이 없습니다.
          <br />
          팀을 생성하거나 팀에 참여해보세요.
        </h1>
      </div>
      <div className="flex w-46.5 flex-col gap-2">
        <Link href={`${PATHS.ADDGROUP}`}>
          <Button variant="solid" size="fullWidth">
            팀 생성하기
          </Button>
        </Link>
        <Link href={`${PATHS.JOINGROUP}`}>
          <Button variant="ghost-primary" size="fullWidth">
            팀 참여하기
          </Button>
        </Link>
      </div>
    </main>
  );
}
