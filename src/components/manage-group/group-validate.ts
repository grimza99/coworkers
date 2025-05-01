import { Group, GROUP_MESSAGE } from './ManageGroup';

export interface Validation {
  field: keyof Group;
  message: string;
}

const manageGroupValidate = (group: Group) => {
  const { image, name } = group;

  const messageArray: Validation[] = [];

  if (image === null || image === '') {
    messageArray.push({
      field: 'image',
      message: GROUP_MESSAGE.EMPTY_GROUP_IMAGE,
    });
  }

  if (!name.trim()) {
    messageArray.push({
      field: 'name',
      message: GROUP_MESSAGE.EMPTY_GROUP_NAME,
    });
  }

  return messageArray;
};

export default manageGroupValidate;
