'use client';
import Image from 'next/image';
import kakaoIcon from '@/../public/icons/kakao-oauth-icon.svg';
import googleIcon from '@/../public/icons/google-oauth-icon.svg';

export default function OAuthBtnGroup() {
  const handleClick = () => {
    //OAuth 함수구현
  };

  return (
    <div className="flex gap-4">
      <Image onClick={handleClick} src={googleIcon} width={42} height={42} alt="구글" />
      <Image onClick={handleClick} src={kakaoIcon} width={42} height={42} alt="카카오" />
    </div>
  );
}
