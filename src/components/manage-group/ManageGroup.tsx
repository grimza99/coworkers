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

export default function ManageGroup({ isEdit, groupData }: MangeGroupProps) {
  const {
    group,
    handleNameBlur,
    getMessage,
    handleNameChange,
    handleImageChange,
    handleAddGroupSubmit,
  } = useManageGroup({ groupData });

  const groupButtonText = isEdit ? '수정하기' : '생성하기';

  const imageMessage = getMessage('image');
  const nameMessage = getMessage('name');

  return (
    <form onSubmit={handleAddGroupSubmit} className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-6">
        <FormField
          field="file-input"
          name="image"
          label="팀 프로필"
          required
          imageUploaderType="team"
          isFailure={!!imageMessage}
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
          isFailure={!group.name.trim()}
          errorMessage={nameMessage}
          value={group.name}
          onChange={handleNameChange}
          onFieldBlur={handleNameBlur}
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
