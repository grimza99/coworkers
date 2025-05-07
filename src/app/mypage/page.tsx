'use client';

import ProfileImageUploader from './_mypage/ProfileImageUploader';
import NicknameField from './_mypage/NicknameField';
import PasswordField from './_mypage/PasswordField';
import AccountModals from './_mypage/AccountModals';
import axiosClient from '@/lib/axiosClient';
import { getClientCookie, deleteClientCookie } from '@/lib/cookie/client';
import { getUserApiResponse } from '@/types/user';
import { useEffect, useState } from 'react';
import useModalContext from '@/components/common/modal/core/useModalContext';
import FormField from '@/components/common/formField';

async function fetchUserInfo(): Promise<getUserApiResponse | null> {
  try {
    const token = getClientCookie('accessToken');
    if (!token) {
      deleteClientCookie('accessToken');
      deleteClientCookie('refreshToken');
      return null;
    }

    const response = await axiosClient.get<getUserApiResponse>('/user');
    return response.data;
  } catch (error) {
    console.error('계정 정보 가져오기 실패', error);
    return null;
  }
}

export default function MyPage() {
  const [userData, setUserData] = useState<getUserApiResponse | null>(null);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const { openModal, closeModal } = useModalContext();

  useEffect(() => {
    fetchUserInfo().then((data) => {
      if (data) {
        setUserData(data);
        setNickname(data.nickname || '');
        setImage(data.image || '');
      }
    });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mx-4 mt-6 w-full max-w-198 min-w-[343px] md:mx-6 lg:mt-7">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-xl-bold flex w-full flex-col pb-3 text-start">계정설정</h1>
          <div className="flex w-full flex-col gap-6">
            <ProfileImageUploader image={image} setImage={setImage} />
            <NicknameField
              nickname={nickname}
              nicknameError={nicknameError}
              setNickname={setNickname}
              setNicknameError={setNicknameError}
              onClick={async () => {
                try {
                  await axiosClient.patch('/user', { nickname });
                  openModal('nickname-change-success');
                } catch (error: unknown) {
                  const errorObj = error as { response?: { data?: { message?: string } } };
                  const message = errorObj?.response?.data?.message || '닉네임 변경 실패';
                  setNicknameError(message);
                  openModal('nickname-fail');
                }
              }}
            />
            <FormField field="input" label="이메일" value={userData?.email || ''} readOnly />
            <PasswordField
              password={password}
              setPassword={setPassword}
              onClick={() => openModal('change-password')}
            />
            <button
              type="button"
              className="text-danger text-lg-md flex w-fit items-center gap-1 text-start"
              onClick={() => {
                closeModal('confirm-delete-account');
                openModal('delete-account');
              }}
            >
              <img src="/icons/secession.svg" width={24} height={24} alt="회원탈퇴 아이콘" />
              회원 탈퇴하기
            </button>
          </div>
        </div>
      </div>
      <AccountModals nickname={nickname} />
    </div>
  );
}
