import OAuthBtnGroup from './OAuthBtnGroup';

interface OAuthUIProps {
  login?: boolean;
  signUp?: boolean;
}

export default function OAuthUI({ login, signUp }: OAuthUIProps) {
  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="flex items-center gap-6">
        <div className="border-border h-[1px] w-full border-1" />
        <p className="text-lg-rg">OR</p>
        <div className="border-border h-[1px] w-full border-1" />
      </div>
      <div className="flex justify-between">
        {login && <p className="text-lg-md">간편 로그인하기</p>}
        {signUp && <p className="text-lg-md">간편 회원가입하기</p>}
        <OAuthBtnGroup />
      </div>
    </div>
  );
}
