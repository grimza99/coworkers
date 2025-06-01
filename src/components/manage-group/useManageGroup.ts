import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import postImageUrl from '@/lib/api/image/postImageUrl';
import axiosClient from '@/lib/axiosClient';
import { Toast } from '../common/Toastify';
import { ManageGroup } from './ManageGroup';
import { useUser } from '@/contexts/UserContext';
import useZodForm from '@/hooks/useZodForm';

interface ManageGroupProps {
  isEdit: boolean;
  groupData?: ManageGroup;
  groupNames: string[];
}

interface GroupValue {
  name: string;
  image: string;
}

const GROUP_MESSAGE = {
  EMPTY_GROUP_IMAGE: '프로필 이미지를 넣어주세요.',
  EMPTY_GROUP_NAME: '팀 이름을 작성해 주세요.',
  DUPLICATED_GROUP_NAME: '이미 존재하는 팀 이름입니다.',
  OVER_LENGTH_GROUP_NAME: '팀 이름은 10글자까지 가능합니다.',
  INVALID_GROUP_IMAGE_URL: '올바른 이미지 주소가 아닙니다.',
};

export default function useManageGroup({ isEdit, groupData, groupNames }: ManageGroupProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { fetchUser } = useUser();

  const isDuplicatedName = groupNames.filter((n) => n !== groupData?.name);

  const groupSchema = z.object({
    name: z
      .string()
      .min(1, { message: GROUP_MESSAGE.EMPTY_GROUP_NAME })
      .max(10, { message: GROUP_MESSAGE.OVER_LENGTH_GROUP_NAME })
      .refine((value) => !isDuplicatedName.includes(value), {
        message: GROUP_MESSAGE.DUPLICATED_GROUP_NAME,
      }),
    image: z
      .string()
      .min(1, { message: GROUP_MESSAGE.EMPTY_GROUP_IMAGE })
      .url({ message: GROUP_MESSAGE.INVALID_GROUP_IMAGE_URL }),
  });

  const defaultValues = {
    name: groupData?.name ?? '',
    image: groupData?.image ?? '',
  };

  const form = useZodForm({
    validationSchema: groupSchema,
    defaultValues,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    postImageUrl(file)
      .then((result) => form.setValue('image', result.url, { shouldValidate: true }))
      .catch(() => {
        Toast.error('이미지 불러오기 실패');
      });
  };

  const image = form.watch('image');

  const handleSubmitGroup = ({ name, image }: GroupValue) => {
    const isUnchanged = name === groupData?.name && image === groupData?.image;

    if (isUnchanged) {
      Toast.info('변경 사항이 없습니다.');
      return;
    }

    setIsPending(true);

    axiosClient
      .request({
        url: isEdit ? `/groups/${groupData?.id}` : '/groups',
        method: isEdit ? 'patch' : 'post',
        data: { name, image },
      })
      .then((result) => {
        fetchUser();
        setTimeout(() => router.push(`/${result.data.id}`), 500);
      })
      .catch(() => {
        Toast.error(`팀 ${isEdit ? '수정' : '생성'} 실패`);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return {
    form,
    image,
    isPending,
    handleSubmitGroup,
    handleImageChange,
  };
}
