'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import SideMenu from './SideMenu';
import GroupDropdownSelector from './GroupDropdownSelector';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import PATHS from '@/constants/paths';
import ProfileDropdownButton from './ProfileDropdownButton';
import { useUser } from '@/contexts/UserContext';
import { Group } from '@/types/group';

const MINIMAL_HEADER_PATHS = [
  PATHS.HOME,
  PATHS.LOGIN,
  PATHS.SIGNUP,
  PATHS.SIGNUP_KAKAO,
  '/reset-password',
  PATHS.ADDGROUP,
];

// 그룹이 필요한 페이지들 (groupId가 URL에 있는 페이지들)
const GROUP_REQUIRED_PATHS = ['/groups/', '/group/'];

export default function Header() {
  const pathname = usePathname();
  const { groupId } = useParams<{ groupId: string }>();
  const { user, memberships, isLoading } = useUser();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const groups: Group[] =
    !isLoading && memberships ? memberships.map((membership) => membership.group) : [];

  useEffect(() => {
    if (!isLoading && memberships && groupId !== null) {
      const numericId = Number(groupId);
      const isValid = memberships.some((m) => m.group.id === numericId);

      if (isValid) {
        setSelectedGroupId(numericId);
      } else {
        setSelectedGroupId(null);
      }
    }
  }, [groupId, memberships, isLoading]);

  const {
    ref: sideMenuRef,
    isOpen: isSideMenuOpen,
    setIsOpen: setIsSideMenuOpen,
  } = useOutSideClickAutoClose(false);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];

  const isMinimalHeader = MINIMAL_HEADER_PATHS.includes(pathname);
  const hasGroup = groups.length > 0;

  // 현재 페이지가 그룹이 필요한 페이지인지 확인
  const isGroupRequiredPage = GROUP_REQUIRED_PATHS.some((path) => pathname.startsWith(path));

  // 로딩 중이거나, 미니멀 헤더 페이지인 경우에만 미니멀 헤더 표시
  if (isMinimalHeader || isLoading) {
    return (
      <header className="bg-bg200 border-border sticky top-0 z-200 flex h-15 w-full justify-center border-b-1">
        <div className="mx-5 flex w-full max-w-300 items-center justify-between">
          <Logo />
        </div>
      </header>
    );
  }

  // 그룹이 필요한 페이지인데 선택된 그룹이 없는 경우에만 미니멀 헤더
  if (isGroupRequiredPage && !selectedGroup) {
    return (
      <header className="bg-bg200 border-border sticky top-0 z-200 flex h-15 w-full justify-center border-b-1">
        <div className="mx-5 flex w-full max-w-300 items-center justify-between">
          <Logo />
        </div>
      </header>
    );
  }

  return (
    <header className="bg-bg200 border-border sticky top-0 z-200 flex h-15 w-full justify-center border-b-1">
      <div className="mx-5 flex w-full max-w-300 items-center justify-between">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSideMenuOpen(true)}
              className="block md:hidden"
              title="메뉴 열기"
            >
              <Image src="/icons/gnb-menu.svg" alt="메뉴" width={24} height={24} />
            </button>

            <Logo />
          </div>

          <div className="text-lg-md relative hidden items-center gap-8 md:flex lg:gap-y-10">
            {hasGroup && selectedGroup && (
              <GroupDropdownSelector
                groups={groups}
                selectedGroupName={selectedGroup?.name ?? ''}
                setSelectedGroupId={setSelectedGroupId}
              />
            )}
            <Link href={`/articles`} className="cursor:pointer mt-0">
              자유게시판
            </Link>
          </div>
        </div>

        <div className="ml-auto">
          {user && (
            <ProfileDropdownButton
              userData={{
                ...user,
                email: '',
                memberships: [],
                createdAt: '',
                updatedAt: '',
                teamId: '',
              }}
            />
          )}
        </div>
      </div>

      <SideMenu
        ref={sideMenuRef}
        groups={groups}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </header>
  );
}
