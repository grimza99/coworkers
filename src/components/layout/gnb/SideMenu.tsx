'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import CoworkersLogo from '@/assets/CoworkersLogo';
import GroupSearchBar from './GroupSearchBar';

interface Group {
  id: number;
  name: string;
}

interface SideMenuProps {
  groups: Group[];
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(({ groups, isOpen, onClose }, ref) => {
  const pathname = usePathname();
  const selectedGroupId = pathname.split('/')[1];
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />}

      <div
        ref={ref}
        className={clsx(
          'bg-bg200 fixed top-0 left-0 z-300 flex h-screen w-51 transform flex-col gap-6 overflow-scroll p-4 pb-10 shadow-lg transition-transform duration-500',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between">
          <CoworkersLogo className="w-25" />
          <button type="button" onClick={onClose} className="cursor-pointer" title="닫기">
            <Image src="/icons/close.svg" alt="닫기" width={24} height={24} />
          </button>
        </div>

        <div className="border-border flex flex-col gap-6 border-b pb-6">
          <GroupSearchBar groups={groups} onFilteredGroupsChange={setFilteredGroups} />
          {filteredGroups.map((group) => (
            <Link
              key={group.id}
              href={`/${group.id}`}
              className={clsx(
                'text-md-md hover:text-primary px-2 py-1',
                String(group.id) === selectedGroupId && 'text-lg-bold text-primary'
              )}
            >
              {group.name}
            </Link>
          ))}
        </div>
        <Link href="/articles" className="hover:text-primary text-md-md cursor-pointer px-2 py-1">
          자유게시판
        </Link>
      </div>
    </>
  );
});

SideMenu.displayName = 'SideMenu';

export default SideMenu;
