import Input from '@/components/common/formField/compound/Input';
import OAuth from '@/components/oauth';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="m-auto mb-10 flex w-[460px] flex-col items-center">
        <h1 className="mb-20 text-4xl">로그인</h1>
        <form className="flex w-full flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-2">
              이메일
            </label>
            <Input id="email" type="email" placeholder="이메일을 입력해주세요." />
          </div>
          <div>
            <label htmlFor="password" className="mb-2">
              비밀번호
            </label>
            <Input id="password" type="password" placeholder="비밀번호를 입력해주세요." />
          </div>
          <button
            type="submit"
            className="text-lg-semi bg-primary flex h-12 justify-center rounded-xl px-4 py-3"
          >
            로그인
          </button>
        </form>
      </div>
      <OAuth authType="login" />
    </div>
  );
}
