import { useState } from 'react';
import { useRouter } from 'next/navigation';
import postImageUrl from '@/lib/api/image/postImageUrl';
import axiosClient from '@/lib/axiosClient';
import { validateEmptyValue } from '@/utils/validators';
import { Toast } from '../common/Toastify';
import { ManageGroup } from './ManageGroup';

const GROUP_MESSAGE = {
  EMPTY_GROUP_IMAGE: '프로필 이미지를 넣어주세요.',
  EMPTY_GROUP_NAME: '팀 이름을 작성해 주세요.',
  DUPLICATION_GROUP_NAME: '이미 존재하는 팀 이름입니다.',
  EQUAL_GROUP_NAME: '팀 이름을 수정해 주세요.',
};

const INITIAL_GROUP_VALUE: ManageGroup = {
  image: '',
  name: '',
};

export default function useManageGroup({
  groupData,
  groupNames,
}: {
  groupData?: ManageGroup;
  groupNames: string[];
}) {
  const [group, setGroup] = useState<ManageGroup>(groupData ?? INITIAL_GROUP_VALUE);
  const [isSubmit, setIsSubmit] = useState(false);

  const isNameEmpty = validateEmptyValue(group.name);
  const isNameDuplicate = groupNames.includes(group.name);
  const isNameEqual = groupData?.name === group.name;
  const isImageEmpty = group.image === '';

  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    postImageUrl(file)
      .then((result) => {
        setGroup((prev) => ({
          ...prev,
          image: result.url,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const imageErrorMessage = () => {
    if (isImageEmpty) return GROUP_MESSAGE.EMPTY_GROUP_IMAGE;
  };

  const nameErrorMessage = () => {
    if (isNameEmpty) return GROUP_MESSAGE.EMPTY_GROUP_NAME;

    if (isNameDuplicate) return GROUP_MESSAGE.DUPLICATION_GROUP_NAME;

    if (isNameEqual) return GROUP_MESSAGE.EQUAL_GROUP_NAME;
  };

  const isNameFailure = isNameEmpty || isNameDuplicate || isNameEqual;

  const isManageTeamFormValid = !isImageEmpty && !isNameEmpty && !isNameDuplicate && !isNameEqual;

  const handleManageGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmit(true);

    if (!isManageTeamFormValid) return;

    const isEdit = !!groupData;

    axiosClient
      .request({
        url: isEdit ? `/groups/${groupData.id}` : '/groups',
        method: isEdit ? 'patch' : 'post',
        data: {
          name: group.name,
          image: group.image,
        },
      })
      .then((result) => {
        setIsSubmit(false);
        router.push(`/${result.data.id}`);
      })
      .catch(() => {
        const action = isEdit ? '수정' : '생성';
        Toast.error(`팀 ${action}에 실패했습니다. 다시 시도해주세요.`);
      });
  };

  return {
    group,
    isNameFailure,
    isImageEmpty,
    isSubmit,
    imageErrorMessage,
    nameErrorMessage,
    handleNameChange,
    handleImageChange,
    handleManageGroupSubmit,
  };
}
