import Image from 'next/image';
import kakaoIcon from '@/../public/icons/kakao-oauth-icon.svg';
import googleIcon from '@/../public/icons/google-oauth-icon.svg';

interface OAuthUIProps {
  login?: boolean;
  signUp?: boolean;
}

export default function OAuthUI({ login, signUp }: OAuthUIProps) {
  const handleClick = () => {
    //OAuth 함수구현
  };

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
        <div className="flex gap-4">
          <Image onClick={handleClick} src={googleIcon} width={42} height={42} alt="구글" />
          <Image onClick={handleClick} src={kakaoIcon} width={42} height={42} alt="카카오" />
        </div>
      </div>
    </div>
  );
}
