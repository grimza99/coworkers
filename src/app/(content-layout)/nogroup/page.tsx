import Button from '@/components/common/Button';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex h-[calc(100vh-92px)] flex-col items-center justify-center gap-12 md:gap-20">
      <div>
        <Image
          width={2430}
          height={765}
          src="/images/nogroup-main.png"
          alt="협업하는 사람들의 모습이 표현된 메인 일러스트레이션"
          className="mb-8 w-[312px] md:mb-12 md:w-[520px] lg:w-[810px]"
        />
        <h1 className="text-sm-md md:text-lg-md text-gray500 text-center">
          아직 소속된 팀이 없습니다.
          <br />
          팀을 생성하거나 팀에 참여해보세요.
        </h1>
      </div>
      <div className="flex w-46.5 flex-col gap-2">
        <Button variant="solid" size="fullWidth">
          팀 생성하기
        </Button>
        <Button variant="ghost-primary" size="fullWidth">
          팀 참여하기
        </Button>
      </div>
    </main>
  );
}
