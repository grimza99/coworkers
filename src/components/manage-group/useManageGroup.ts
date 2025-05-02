import { useState } from 'react';
import { Group } from './ManageGroup';
import postImageUrl from '@/utils/postImageUrl';
import axiosClient from '@/lib/axiosClient';
import manageGroupValidate, { Validation } from './group-validate';

const INITIAL_GROUP_VALUE: Group = {
  image: null,
  name: '',
};

export default function useManageGroup(groupData?: Group) {
  const [group, setGroup] = useState<Group>(groupData ?? INITIAL_GROUP_VALUE);
  const [validationMessage, setValidationMessage] = useState<Validation | null>();

  const getMessage = (field: string) => {
    return validationMessage?.field === field ? validationMessage.message : '';
  };

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

        if (validationMessage?.field === 'image') {
          setValidationMessage(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = manageGroupValidate(group);

    if (validation) {
      setValidationMessage(validation);
      return;
    }

    axiosClient
      .post('/groups', group)
      .then(() => {
        setGroup(INITIAL_GROUP_VALUE);
        setValidationMessage(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { group, getMessage, handleNameChange, handleImageChange, handleAddGroupSubmit };
}
