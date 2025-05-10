'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/common/formField/compound/Input';
import Image from 'next/image';

interface Group {
  id: number;
  name: string;
}

interface GroupSearchBarProps {
  groups: Group[];
  onFilteredGroupsChange: (filtered: Group[]) => void;
}

export default function GroupSearchBar({ groups, onFilteredGroupsChange }: GroupSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilteredGroupsChange(filtered);
  }, [searchTerm, groups, onFilteredGroupsChange]);

  return (
    <Input
      placeholder="팀 이름 검색"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      leftSlot={<Image src="/icons/search.svg" alt="검색" width={16} height={16} />}
      className="h-[40px] p-0"
      borderClassName="border-border"
    />
  );
}
