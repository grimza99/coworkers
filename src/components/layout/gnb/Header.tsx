'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import SideMenu from './SideMenu';
import GroupDropdownSelector from './GroupDropdownSelector';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import { Group } from '@/types/group';
import PATHS from '@/constants/paths';
import ProfileDropdownButton from './ProfileDropdownButton';
import { useUser } from '@/contexts/UserContext';
import { useGroups } from '@/contexts/GroupContext';

const MINIMAL_HEADER_PATHS = [
  PATHS.HOME,
  PATHS.LOGIN,
  PATHS.SIGNUP,
  PATHS.SIGNUP_KAKAO,
  '/reset-password',
  PATHS.ADDGROUP,
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { groups } = useGroups();
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  useEffect(() => {
    const currentPathId = pathname.split('/')[1];
    const matchedGroup = groups.find((g) => String(g.id) === currentPathId);

    if (matchedGroup) {
      setSelectedGroupId(matchedGroup.id);
    } else if (groups[0]) {
      setSelectedGroupId(groups[0].id);
      router.replace(`/${groups[0].id}`);
    } else {
      setSelectedGroupId(null);
      router.replace(`/`);
    }
  }, [pathname, groups]);

  const {
    ref: sideMenuRef,
    isOpen: isSideMenuOpen,
    setIsOpen: setIsSideMenuOpen,
  } = useOutSideClickAutoClose(false);

  const isMinimalHeader = MINIMAL_HEADER_PATHS.includes(pathname);
  const hasGroup = groups.length > 0;

  if (isMinimalHeader) {
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
            {hasGroup && (
              <GroupDropdownSelector
                groups={groups}
                selectedGroupId={selectedGroupId}
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
