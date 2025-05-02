import { Group, GROUP_MESSAGE } from './ManageGroup';

export interface Validation {
  field: string;
  message: string;
}

const manageGroupValidate = (group: Group) => {
  const { image, name } = group;

  if (image === null || image === '') {
    return {
      field: 'image',
      message: GROUP_MESSAGE.EMPTY_GROUP_IMAGE,
    };
  }

  if (!name.trim()) {
    return {
      field: 'name',
      message: GROUP_MESSAGE.EMPTY_GROUP_NAME,
    };
  }

  return null;
};

export default manageGroupValidate;
