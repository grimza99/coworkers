import { useState } from 'react';
import { Group } from './ManageGroup';
import postImageUrl from '@/utils/postImageUrl';
import axiosClient from '@/lib/axiosClient';

const INITIAL_GROUP_VALUE: Group = {
  image: null,
  name: '',
};

export default function useManageGroup(groupData?: Group) {
  const [group, setGroup] = useState<Group>(groupData ?? INITIAL_GROUP_VALUE);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await postImageUrl(file)
      .then((result) =>
        setGroup((prev) => ({
          ...prev,
          image: result.url,
        }))
      )
      .catch((err) => console.error(err));
  };

  const handleAddGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    axiosClient
      .post('/groups', group)
      .then(() => {
        setGroup(INITIAL_GROUP_VALUE);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { group, handleNameChange, handleImageChange, handleAddGroupSubmit };
}
