'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import useManageGroup from './useManageGroup';

export interface Group {
  image: string | null;
  name: string;
}

interface MangeGroupProps {
  isEdit?: boolean;
  groupData?: Group;
}

export const GROUP_MESSAGE = {
  EMPTY_GROUP_IMAGE: '프로필 이미지를 넣어주세요.',
  EMPTY_GROUP_NAME: '팀 이름을 작성해 주세요.',
  EQUAL_GROUP_NAME: '이미 존재하는 팀 이름입니다.',
};

export default function ManageGroup({ isEdit, groupData }: MangeGroupProps) {
  const { group, getMessage, handleNameChange, handleImageChange, handleAddGroupSubmit } =
    useManageGroup(groupData);

  const groupButtonText = isEdit ? '수정하기' : '생성하기';

  const imageMessage = getMessage('image');

  return (
    <form onSubmit={handleAddGroupSubmit} className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-6">
        <FormField
          field="file-input"
          name="image"
          label="팀 프로필"
          required
          imageUploaderType="team"
          isFailure={group.image === null}
          errorMessage={imageMessage}
          image={group.image}
          onImageChange={handleImageChange}
        />
        <FormField
          field="input"
          name="name"
          label="팀 이름"
          required
          placeholder="팀 이름을 입력해 주세요."
          isFailure={group.name === ''}
          errorMessage={GROUP_MESSAGE.EMPTY_GROUP_NAME}
          value={group.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex flex-col gap-6">
        <Button
          type="submit"
          variant="solid"
          size="fullWidth"
          // disabled={group.image === null || group.name === ''}
        >
          {groupButtonText}
        </Button>
        <p className="text-lg-rg text-gray500 text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}
