import OAuthButtonGroup from './OAuthBtnGroup';

interface OAuthUIProps {
  authType: 'login' | 'signup';
}

export default function OAuth({ authType }: OAuthUIProps) {
  const authText = authType === 'login' ? '간편 로그인하기' : '간편 회원가입하기';
  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="flex items-center gap-6">
        <div className="border-border h-[1px] w-full border-1" />
        <p className="text-lg-rg">OR</p>
        <div className="border-border h-[1px] w-full border-1" />
      </div>
      <div className="flex justify-between">
        <p className="text-lg-md">{authText}</p>
        <OAuthButtonGroup />
      </div>
    </div>
  );
}
