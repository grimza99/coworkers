import { useState } from 'react';
import { Group } from './ManageGroup';
import postImageUrl from '@/utils/postImageUrl';
import axiosClient from '@/lib/axiosClient';
import manageGroupValidate, { State } from './group-validate';

const INITIAL_GROUP_VALUE: Group = {
  image: null,
  name: '',
};

export default function useManageGroup(groupData?: Group) {
  const [group, setGroup] = useState<Group>(groupData ?? INITIAL_GROUP_VALUE);
  const [state, setState] = useState<State[]>([]);

  const getMessage = (field: keyof Group) => {
    return state.find((state) => state.field === field)?.message || '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await postImageUrl(file);
      setGroup((prev) => ({
        ...prev,
        image: result.url,
      }));

      setState((prev) => prev.filter((item) => item.field !== 'image'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = manageGroupValidate(group);

    if (validation.length > 0) {
      setState(validation);
      return;
    }

    axiosClient
      .post('/groups', group)
      .then(() => {
        setGroup(INITIAL_GROUP_VALUE);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { group, getMessage, handleNameChange, handleImageChange, handleAddGroupSubmit };
}
