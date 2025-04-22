// SideMenu.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import closeIcon from '@/../public/icons/close.svg';

interface Team {
  id: number;
  name: string;
}

interface SideMenuProps {
  teams: Team[];
  isOpen: boolean;
  onClose: () => void;
}

// @TODO: 슬라이드 애니메이션효과 넣기
export default function SideMenu({ teams, isOpen, onClose }: SideMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      
      {/* 사이드 메뉴 */}
      <div className="fixed overflow-scroll pb-10 left-0 top-0 z-50 h-[812px] w-[204px] bg-bg200 p-4 shadow-lg flex flex-col gap-6">
        <button onClick={onClose} className="self-end cursor-pointer" title="닫기">
        <Image src={closeIcon} alt="닫기" width={24} height={24} />
        </button>

        {/* 팀 목록 */}
        <div className="flex flex-col gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="text-white text-md-md px-2 py-1 rounded hover:bg-bg300 cursor-pointer"
            >
              {team.name}
            </div>
          ))}
        <Link
          href="/articles"
          className="text-primary text-md-md px-2 py-1 cursor-pointer"
        >
          자유게시판
        </Link>
        </div>

      </div>
    </>
  );
}