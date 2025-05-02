import { useState } from 'react';
import { Group } from './ManageGroup';
import postImageUrl from '@/lib/api/image/postImageUrl';
import axiosClient from '@/lib/axiosClient';
import manageGroupValidate, { GROUP_MESSAGE, Validation } from './group-validate';
import { useRouter } from 'next/navigation';

const INITIAL_GROUP_VALUE: Group = {
  image: null,
  name: '',
};

export default function useManageGroup({ groupData }: { groupData?: Group }) {
  const [group, setGroup] = useState<Group>(groupData ?? INITIAL_GROUP_VALUE);
  const [validationMessages, setValidationMessages] = useState<Validation[]>([]);

  const router = useRouter();

  const getMessage = (field: string) => {
    return validationMessages.find((m) => m.field === field)?.message ?? '';
  };

  const handleNameBlur = () => {
    setValidationMessages((prev) => [
      ...prev.filter((m) => m.field !== 'name'),
      ...(!group.name.trim()
        ? [{ field: 'name' as keyof Group, message: GROUP_MESSAGE.EMPTY_GROUP_NAME }]
        : []),
    ]);
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

        setValidationMessages((prev) => prev.filter((m) => m.field !== 'image'));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = manageGroupValidate(group);

    if (validation.length > 0) {
      setValidationMessages(validation);
      return;
    }

    axiosClient
      .post('/groups', group)
      .then((result) => {
        setGroup(INITIAL_GROUP_VALUE);
        setValidationMessages([]);
        router.push(`/${result.data.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    group,
    getMessage,
    handleNameBlur,
    handleNameChange,
    handleImageChange,
    handleAddGroupSubmit,
  };
}
