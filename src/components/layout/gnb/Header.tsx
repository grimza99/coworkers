'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import SideMenu from './SideMenu';
import DropDownProfileItemList from '@/components/common/dropdown/ProfileItem';
import DropDownGroupsItem from '@/components/common/dropdown/GroupsItem';
import DropDown from '@/components/common/dropdown/index';
import { OptionSelector } from '@/components/common/dropdown/OptionSelector';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import Button from '@/components/common/Button';
import axiosClient from '@/lib/axiosClient';
import { User } from '@/types/user';

const MINIMAL_HEADER_PATHS = [
  '/',
  '/login',
  '/signup',
  '/oauth/signup/kakao',
  '/reset-password',
  '/addteam',
  '/jointeam',
];

interface Group {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}

interface Membership {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
  group: Group;
}

export interface UserData extends User {
  createdAt: string;
  updatedAt: string;
  teamId: string;
  email: string;
  memberships: Membership[];
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [teams, setTeams] = useState<Group[]>([]);
  const [selectedTeamName, setSelectedTeamName] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axiosClient.get('/user');
        setUserData(data);

        const extractedTeams = Array.isArray(data.memberships)
          ? data.memberships.map((m: { group: Group }) => m.group)
          : [];

        setTeams(extractedTeams);

        const currentPathId = pathname.split('/')[1];
        const currentTeam = extractedTeams.find((team: Group) => String(team.id) === currentPathId);
        setSelectedTeamName(currentTeam?.name || extractedTeams[0]?.name || '');
      } catch (error) {
        console.error('유저 정보 가져오기 실패', error);
      }
    };

    fetchUserData();
  }, [pathname]);

  const {
    ref: sideMenuRef,
    isOpen: isSideMenuOpen,
    setIsOpen: setIsSideMenuOpen,
  } = useOutSideClickAutoClose(false);

  const isMinimalHeader = MINIMAL_HEADER_PATHS.includes(pathname);

  if (isMinimalHeader) {
    return (
      <header className="bg-bg200 border-border sticky top-0 flex h-15 w-full justify-center border-b-1 py-[14px]">
        <div className="flex w-full max-w-300 items-center justify-between p-4">
          <Logo />
        </div>
      </header>
    );
  }

  const userName = userData?.nickname ?? '';
  const hasTeam = teams.length > 0;

  return (
    <header className="bg-bg200 border-border sticky top-0 z-200 flex h-15 w-full justify-center border-b-1 py-[14px]">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
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
            {hasTeam && (
              <OptionSelector
                placement=""
                size="xl"
                defaultValue={selectedTeamName}
                options={teams.map((group) => {
                  return <DropDownGroupsItem key={group.id} group={group} />;
                })}
                onSelect={(e) => {
                  const clickedTeamName = (e.target as HTMLElement).innerText;
                  const selectedTeam = teams.find((team) => team.name === clickedTeamName);
                  if (selectedTeam) {
                    setSelectedTeamName(selectedTeam.name);
                    router.push(`/${selectedTeam.id}`);
                  }
                }}
                footerBtn={
                  <Button variant="ghost-white" size="fullWidth" fontSize="16">
                    <Link href="/addteam">+ 팀 추가하기</Link>
                  </Button>
                }
              />
            )}
            <Link href={`/articles`} className="cursor:pointer mt-0">
              자유게시판
            </Link>
          </div>
        </div>

        <div className="ml-auto">
          <DropDown
            size="lg"
            placement="top-8 -right-2"
            dropDownOpenBtn={
              <button type="button" className="flex items-center gap-2">
                {userData?.image ? (
                  <Image src={userData.image} alt="유저 이미지" width={24} height={24} />
                ) : (
                  <Image src="/icons/user.svg" alt="유저 아이콘" width={24} height={24} />
                )}
                <span className="text-md-md hidden lg:inline">{userName}</span>
              </button>
            }
            options={DropDownProfileItemList}
            onSelect={() => {}}
          />
        </div>
      </div>

      <SideMenu
        ref={sideMenuRef}
        teams={teams}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </header>
  );
}
