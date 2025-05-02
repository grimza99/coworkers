'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import axiosClient from '@/lib/axiosClient';
import PATHS from '@/constants/paths';
import { getUserApiResponse } from '@/types/user';

export default function StartButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleClick = async () => {
    const res = await axiosClient.get<getUserApiResponse>(`/user`);

    const memberships = res.data?.memberships || [];

    router.push(
      memberships.length > 0 ? `${PATHS.getGroupPath(memberships[0].groupId)}` : `${PATHS.NO_GROUP}`
    );
  };

  return (
    <Button variant="gradient" fontSize="16" size="xl" onClick={handleClick}>
      {children}
    </Button>
  );
}
