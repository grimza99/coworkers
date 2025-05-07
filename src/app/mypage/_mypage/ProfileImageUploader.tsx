'use client';

import FormField from '@/components/common/formField';
import axiosClient from '@/lib/axiosClient';

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

          setImage(uploadedUrl);
        } catch (error) {
          console.error('프로필 이미지 저장 실패:', error);
        }
      }}
    />
  );
}
