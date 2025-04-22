// SideMenu.tsx
'use client';

import Link from 'next/link';

interface Team {
  id: number;
  name: string;
}

interface SideMenuProps {
  teams: Team[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ teams, isOpen, onClose }: SideMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 클릭 시 닫기 */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      
      {/* 사이드 메뉴 본체 */}
      <div className="fixed left-0 top-0 z-50 h-[812px] w-[204px] bg-bg200 p-4 shadow-lg flex flex-col gap-6">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="self-end text-white">
          ✕
        </button>

        {/* 팀 목록 */}
        <div className="flex flex-col gap-2">
          {teams.map((team) => (
            <div
              key={team.id}
              className="text-white text-sm px-2 py-1 rounded hover:bg-bg300 cursor-pointer"
            >
              {team.name}
            </div>
          ))}
        </div>

        {/* 자유게시판 링크 */}
        <Link
          href="/articles"
          className="mt-4 text-white text-sm px-2 py-1 hover:underline"
        >
          자유게시판
        </Link>
      </div>
    </>
  );
}