import { useState } from 'react';
import { Group } from './ManageGroup';
import postImageUrl from '@/lib/api/image/postImageUrl';
import axiosClient from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';
import { validateEmptyValue } from '@/utils/validators';

export const GROUP_MESSAGE = {
  EMPTY_GROUP_IMAGE: '프로필 이미지를 넣어주세요.',
  EMPTY_GROUP_NAME: '팀 이름을 작성해 주세요.',
  DUPLICATION_GROUP_NAME: '이미 존재하는 팀 이름입니다.',
};

const INITIAL_GROUP_VALUE: Group = {
  image: null,
  name: '',
};

export default function useManageGroup({
  groupData,
  groupNames,
}: {
  groupData?: Group;
  groupNames?: string[];
}) {
  const [group, setGroup] = useState<Group>(groupData ?? INITIAL_GROUP_VALUE);
  const [isSubmit, setIsSubmit] = useState(false);

  const isNameEmpty = validateEmptyValue(group.name);
  const isImageEmpty = group.image === null;

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

    if (groupNames?.includes(group.name)) return GROUP_MESSAGE.DUPLICATION_GROUP_NAME;
  };

  const isManageTeamFormValid = !isImageEmpty && !isNameEmpty;

  const handleAddGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmit(true);

    if (!isManageTeamFormValid) return;

    axiosClient
      .post('/groups', group)
      .then((result) => {
        setGroup(INITIAL_GROUP_VALUE);
        setIsSubmit(false);

        router.push(`/${result.data.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    group,
    isNameEmpty,
    isImageEmpty,
    isSubmit,
    imageErrorMessage,
    nameErrorMessage,
    handleNameChange,
    handleImageChange,
    handleAddGroupSubmit,
  };
}
