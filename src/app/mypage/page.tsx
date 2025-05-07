'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import axiosClient from '@/lib/axiosClient';
import { getClientCookie, deleteClientCookie } from '@/lib/cookie/client';
import { getUserApiResponse } from '@/types/user';
import { useEffect, useState } from 'react';
import NicknameChangeSuccessModal from '@/components/mypage-modal/NicknameChangeSuccessModal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import NicknameChangeFailModal from '@/components/mypage-modal/NicknameChangeFailModal';
import ChangePasswordModal from '@/components/mypage-modal/ChangePasswordModal';

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

export default function MyTeam() {
  const [userData, setUserData] = useState<getUserApiResponse | null>(null);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const { openModal } = useModalContext();

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
            <FormField
              field="file-input"
              label=""
              imageUploaderType="user"
              image={image}
              onImageChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('image', file);

                try {
                  const uploadRes = await axiosClient.post<{ url: string }>(
                    '/images/upload',
                    formData,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    }
                  );

                  const uploadedUrl = uploadRes.data.url;

                  await axiosClient.patch('/user', {
                    image: uploadedUrl,
                  });

                  setImage(uploadedUrl);
                } catch (error) {
                  console.error('프로필 이미지 저장 실패:', error);
                }
              }}
            />
            <FormField
              field="input"
              label="이름"
              value={nickname}
              isFailure={!!nicknameError}
              errorMessage={nicknameError}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameError('');
              }}
              rightSlot={
                <div className="flex items-center">
                  <Button
                    size="xs"
                    fontSize="14"
                    className="shrink-0"
                    onClick={async () => {
                      try {
                        await axiosClient.patch('/user', { nickname });
                        setNicknameError('');
                        openModal('nickname-change-success');
                      } catch (error: unknown) {
                        const errorObj = error as { response?: { data?: { message?: string } } };
                        const message = errorObj?.response?.data?.message || '닉네임 변경 실패';
                        setNicknameError(message);
                        openModal('nickname-fail');
                      }
                    }}
                  >
                    변경하기
                  </Button>
                </div>
              }
            />
            <FormField field="input" label="이메일" value={userData?.email || ''} readOnly />
            <FormField
              field="input"
              type="password"
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightSlot={
                <div className="flex items-center">
                  <Button
                    size="xs"
                    fontSize="14"
                    className="shrink-0"
                    onClick={() => openModal('change-password')}
                  >
                    변경하기
                  </Button>
                </div>
              }
            />
            <button
              type="button"
              className="text-danger text-lg-md flex items-center gap-1 text-start"
            >
              <img src="/icons/secession.svg" width={24} height={24} alt="회원탈퇴 아이콘" />
              회원 탈퇴하기
            </button>
          </div>
        </div>
      </div>
      <NicknameChangeSuccessModal nickname={nickname} onClose={() => {}} />
      <NicknameChangeFailModal />
      <ChangePasswordModal />
    </div>
  );
}
