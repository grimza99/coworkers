'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import closeIcon from '@/../public/icons/close.svg';
import clsx from 'clsx';

interface Team {
  id: number;
  name: string;
}

interface SideMenuProps {
  teams: Team[];
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(({ teams, isOpen, onClose }, ref) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />}

      <div
        ref={ref}
        className={clsx(
          'bg-bg200 fixed top-0 left-0 z-300 flex h-screen w-[204px] transform flex-col gap-6 overflow-scroll p-4 pb-10 shadow-lg transition-transform duration-500',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button onClick={onClose} className="cursor-pointer self-end" title="닫기">
          <Image src={closeIcon} alt="닫기" width={24} height={24} />
        </button>

        <div className="flex flex-col gap-6">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/groups/${team.id}`}
              className="text-md-md hover:bg-bg300 block cursor-pointer rounded px-2 py-1"
            >
              {team.name}
            </Link>
          ))}
          <Link href="/articles" className="text-primary text-md-md cursor-pointer px-2 py-1">
            자유게시판
          </Link>
        </div>
      </div>
    </>
  );
});

SideMenu.displayName = 'SideMenu';

export default SideMenu;
