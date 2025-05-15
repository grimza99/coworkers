'use client';

import FormField from '@/components/common/formField';
import axiosClient from '@/lib/axiosClient';
import { Toast } from '@/components/common/Toastify';

interface ProfileImageUploaderProps {
  image: string;
  setImage: (url: string) => void;
}

export default function ProfileImageUploader({ image, setImage }: ProfileImageUploaderProps) {
  return (
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
          const uploadRes = await axiosClient.post<{ url: string }>('/images/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const uploadedUrl = uploadRes.data.url;

          await axiosClient.patch('/user', {
            image: uploadedUrl,
          });

          setImage(`${uploadedUrl}?t=${Date.now()}`);
          Toast.success('프로필 이미지가 변경 성공');
        } catch (error) {
          Toast.error('프로필 이미지 저장에 실패했습니다. 다시 시도해주세요.');
        }
      }}
    />
  );
}
