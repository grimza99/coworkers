'use client';

import { useOptimistic } from 'react';
import FormField from '@/components/common/formField';
import axiosClient from '@/lib/axiosClient';
import postImageUrl from '@/lib/api/image/postImageUrl';
import { Toast } from '@/components/common/Toastify';

interface ProfileImageUploaderProps {
  image: string;
  setImage: (url: string) => void;
}

export default function ProfileImageUploader({ image, setImage }: ProfileImageUploaderProps) {
  const [optimisticImage, addOptimisticImage] = useOptimistic(image);

  return (
    <FormField
      field="file-input"
      label=""
      imageUploaderType="user"
      image={optimisticImage || '/default-profile.png'}
      onImageChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        addOptimisticImage(objectUrl); // show preview immediately

        try {
          const uploaded = await postImageUrl(file);
          const uploadedUrl = uploaded.url;

          await axiosClient.patch('/user', {
            image: uploadedUrl,
          });

          const finalUrl = `${uploadedUrl}?t=${Date.now()}`;
          setImage(finalUrl);
          addOptimisticImage(finalUrl);
          Toast.success('프로필 이미지가 변경 성공');
        } catch {
          Toast.error('프로필 이미지 저장에 실패했습니다. 다시 시도해주세요.');
          addOptimisticImage(image); // rollback to original on error
        }
      }}
    />
  );
}
