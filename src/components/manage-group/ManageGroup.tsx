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
  groupNames?: string[];
}

export default function ManageGroup({ isEdit, groupData, groupNames }: MangeGroupProps) {
  const {
    group,
    isNameEmpty,
    isImageEmpty,
    isSubmit,
    imageErrorMessage,
    nameErrorMessage,
    handleNameChange,
    handleImageChange,
    handleAddGroupSubmit,
  } = useManageGroup({
    groupData,
    groupNames,
  });

  const groupButtonText = isEdit ? '수정하기' : '생성하기';

  return (
    <form onSubmit={handleAddGroupSubmit} className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-6">
        <FormField
          field="file-input"
          name="image"
          label="팀 프로필"
          imageUploaderType="team"
          isFailure={isImageEmpty}
          isSubmit={isSubmit}
          errorMessage={imageErrorMessage()}
          image={group.image}
          onImageChange={handleImageChange}
        />
        <FormField
          field="input"
          name="name"
          label="팀 이름"
          placeholder="팀 이름을 입력해 주세요."
          isFailure={isNameEmpty}
          isSubmit={isSubmit}
          errorMessage={nameErrorMessage()}
          value={group.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex flex-col gap-6">
        <Button type="submit" variant="solid" size="fullWidth">
          {groupButtonText}
        </Button>
        <p className="text-lg-rg text-gray500 text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}
