'use client';

import NicknameChangeSuccessModal from '@/components/mypage-modal/NicknameChangeSuccessModal';
import NicknameChangeFailModal from '@/components/mypage-modal/NicknameChangeFailModal';
import ChangePasswordModal from '@/components/mypage-modal/ChangePasswordModal';
import PasswordChangeSuccessModal from '@/components/mypage-modal/PasswordChangeSuccessModal';
import PasswordChangeFailModal from '@/components/mypage-modal/PasswordChangeFailModal';
import DeleteAccountModal from '@/components/mypage-modal/DeleteAccountModal';
import ConfirmDeleteAccountModal from '@/components/mypage-modal/ConfirmDeleteAccountModal';
import DeleteAccountFailModal from '@/components/mypage-modal/DeleteAccountFailModal';

interface AccountModalsProps {
  nickname: string;
}

export default function AccountModals({ nickname }: AccountModalsProps) {
  return (
    <>
      <NicknameChangeSuccessModal nickname={nickname} onClose={() => location.reload()} />
      <NicknameChangeFailModal />
      <ChangePasswordModal onClose={() => {}} />
      <PasswordChangeSuccessModal onClose={() => location.reload()} />
      <PasswordChangeFailModal />
      <DeleteAccountModal />
      <ConfirmDeleteAccountModal />
      <DeleteAccountFailModal />
    </>
  );
}
