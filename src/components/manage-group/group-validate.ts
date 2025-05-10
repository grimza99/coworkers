import { Group } from './ManageGroup';

export interface Validation {
  field: keyof Group;
  message: string;
}

export const GROUP_MESSAGE = {
  EMPTY_GROUP_IMAGE: '프로필 이미지를 넣어주세요.',
  EMPTY_GROUP_NAME: '팀 이름을 작성해 주세요.',
  EQUAL_GROUP_NAME: '이미 존재하는 팀 이름입니다.',
};

const manageGroupValidate = (group: Group): Validation[] => {
  const { image, name } = group;
  const validation: Validation[] = [];

  if (image === null || image === '') {
    validation.push({
      field: 'image',
      message: GROUP_MESSAGE.EMPTY_GROUP_IMAGE,
    });
  }

  if (!name.trim()) {
    validation.push({
      field: 'name',
      message: GROUP_MESSAGE.EMPTY_GROUP_NAME,
    });
  }

  return validation;
};

export default manageGroupValidate;
