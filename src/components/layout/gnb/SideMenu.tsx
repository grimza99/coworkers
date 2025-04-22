// SideMenu.tsx
'use client';

import Link from 'next/link';
<<<<<<< HEAD
import Image from 'next/image';
import closeIcon from '@/../public/icons/close.svg';
=======
>>>>>>> 8423eb9 (Refector : sm시 나타나는 사이드메뉴 컴포넌트 분리)

interface Team {
  id: number;
  name: string;
}

interface SideMenuProps {
  teams: Team[];
  isOpen: boolean;
  onClose: () => void;
}

<<<<<<< HEAD
{/* @TODO: 슬라이드 애니메이션 효과 넣기 */}
=======
>>>>>>> 8423eb9 (Refector : sm시 나타나는 사이드메뉴 컴포넌트 분리)
export default function SideMenu({ teams, isOpen, onClose }: SideMenuProps) {
  if (!isOpen) return null;

  return (
    <>
<<<<<<< HEAD
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      
      <div className="fixed left-0 top-0 z-50 h-[812px] w-[204px] bg-bg200 p-4 shadow-lg flex flex-col gap-6">
        <button onClick={onClose} className="self-end">
          <Image src={closeIcon} alt="닫기" width={24} height={24} />
        </button>

=======
      {/* 배경 클릭 시 닫기 */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      
      {/* 사이드 메뉴 본체 */}
      <div className="fixed left-0 top-0 z-50 h-[812px] w-[204px] bg-bg200 p-4 shadow-lg flex flex-col gap-6">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="self-end text-gray-500">
          x
        </button>

        {/* 팀 목록 */}
>>>>>>> 8423eb9 (Refector : sm시 나타나는 사이드메뉴 컴포넌트 분리)
        <div className="flex flex-col gap-2">
          {teams.map((team) => (
            <div
              key={team.id}
<<<<<<< HEAD
              className="text-white text-md-md px-2 py-1 rounded hover:bg-bg300 cursor-pointer"
=======
              className="text-white text-sm px-2 py-1 rounded hover:bg-bg300 cursor-pointer"
>>>>>>> 8423eb9 (Refector : sm시 나타나는 사이드메뉴 컴포넌트 분리)
            >
              {team.name}
            </div>
          ))}
        </div>

<<<<<<< HEAD
        <Link
          href="/articles"
          className="text-primary text-md-md px-2 py-1"
=======
        {/* 자유게시판 링크 */}
        <Link
          href="/articles"
          className="mt-4 text-white text-sm px-2 py-1 hover:underline"
>>>>>>> 8423eb9 (Refector : sm시 나타나는 사이드메뉴 컴포넌트 분리)
        >
          자유게시판
        </Link>
      </div>
    </>
  );
}