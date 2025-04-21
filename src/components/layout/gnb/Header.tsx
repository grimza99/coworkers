<<<<<<< HEAD
<<<<<<< HEAD
// Header.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
<<<<<<< HEAD
import { useState } from 'react';
import Logo from './Logo';
import DropDown from '@/components/common/dropdown';
import { OptionSelector } from '@/components/common/dropdown/OptionSelector';
import DropDownProfileItemList from '@/components/common/dropdown/ProfileItem';
import DropDownGroupsItem from '@/components/common/dropdown/GroupsItem';
import SideMenu from './SideMenu';
// @TODO: 주소별로 헤더가 다르게 뜨도록

// @TODO: 데이터 연결
// 목데이터 (Swagger 참고: GET /users/me)
const userData = {
  name: '안혜나',
  teams: [
    {
      id: 1,
      name: '경영관리팀',
      image: '/default-team-image.png',
      teamId: 'team-1',
      updatedAt: '',
      createdAt: '',
    },
    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },
    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },
  ],
};

const userName = userData.name;
const selectedTeam = userData.teams[0]?.name || '';

export default function Header() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <header className="bg-bg200 sticky top-0 flex h-[60px] w-full justify-center py-[14px]">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-4">
            {/* sm일 때만 팀페이지, 게시판 대신에 보여지는 아이콘 */}
            <button
              onClick={() => setIsSideMenuOpen(true)}
              className="block md:hidden"
              title="메뉴 열기"
            >
              <Image
                src="/icons/gnb-menu.svg"
                alt="메뉴"
                width={24}
                height={24}
              />
            </button>

            <Logo />
          </div>

          {/* 중앙: 팀 드롭다운 + 자유게시판 */}
          <div className="text-gray100 text-lg-md relative hidden items-center gap-8 md:flex lg:gap-10">
            <OptionSelector
              size="xl"
              defaultValue={selectedTeam}
              options={userData.teams.map((group) => {
                return <DropDownGroupsItem key={group.id} group={group} />;
              })}
              onSelect={() => {}}
              footerBtn={
                <button className="text-text-primary border border-text-primary w-46 h-12 rounded-xl">
                  + 팀 추가하기
                </button>
              }
            />
            <Link href={`/articles`} className="cursor:pointer mt-0">
              자유게시판
            </Link>
          </div>
        </div>

        {/* 유저 아이콘 */}
        {/* @TODO: 유저 이미지 데이터로 받아오기 */}
        <div className="relative ml-auto">
          <DropDown
            size="lg"
            dropDownOpenBtn={
              <button className="bg-bg flex items-center gap-2">
                <Image
                  src="/icons/user.svg"
                  alt="유저 아이콘"
                  width={24}
                  height={24}
                />
                <span className="text-sm text-white hidden lg:inline">{userName}</span>
              </button>
            }
            options={DropDownProfileItemList}
            onSelect={() => {}}
          />
        </div>
      </div>

      {/* 사이드 메뉴 (sm 전용) */}
      <SideMenu
        teams={userData.teams}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </header>
  );
}
=======
'use client ';
=======
'use client';
>>>>>>> c462cf1 (Feat : 팀 드롭다운, 자유게시판 버튼의 반응형 추가)

import Image from 'next/image';
import logoLg from '@/assets/logo-lg.svg';
import logoSm from '@/assets/logo-sm.svg';
=======
>>>>>>> b4435e7 (Refector : Logo 컴포넌트 분리)
import { useState } from 'react';
import Logo from './Logo';
import dropdownIcon from '@/../public/icons/dropdown-icon.svg';
import DropDownGroupsItem from '@/components/common/dropDown/groups-item';
import DropDownProfileItemList from '@/components/common/dropDown/profile-item';

// 목데이터 (Swagger 참고: GET /users/me)
const userData: { name: string; teams: GroupApiResponse[] } = {
  name: '안혜나',
  teams: [
    {
      id: 1,
      name: '경영관리팀',
      image: '/default-team-image.png',
      teamId: 'team-1',
      updatedAt: '',
      createdAt: '',
    },
    {
      id: 2,
      name: '프로젝트팀',
      image: '/default-team-image.png',
      teamId: 'team-2',
      updatedAt: '',
      createdAt: '',
    },
  ],
};

const userName = userData.name;
const selectedTeam = userData.teams[0]?.name || '';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-bg200 sticky top-0 flex h-[60px] w-full justify-center py-[14px]">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
        <div className="flex items-center gap-8 lg:gap-[40px]">
          <div className="flex items-center gap-[16px]">
            {/* sm일 때만 팀페이지, 게시판 대신에 보여지는 아이콘 */}
            <Image
              src="/icons/gnb-menu.svg"
              alt="메뉴"
              width={24}
              height={24}
              className="block md:hidden"
            />

            {/* 로고 */}
            <Logo />
          </div>

          {/* 중앙: 팀 드롭다운 + 자유게시판 */}
          <div className="text-gray100 text-lg-md hidden items-center gap-[32px] md:flex lg:gap-[40px]">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex cursor-pointer items-center gap-1"
              >
                <span>{selectedTeam}</span>
                <Image src={dropdownIcon} alt="드롭다운 아이콘" width={16} height={16} />
              </button>

              {isDropdownOpen && (
                <div className="bg-bg200 absolute top-full left-0 mt-2 w-[186px] rounded-lg p-1 shadow-md">
                  {userData.teams.map((team) => (
                    <DropDownGroupsItem key={team.id} group={team} />
                  ))}
                </div>
              )}
            </div>
            <Link href={`/articles`} className="cursor:pointer">
              자유게시판
            </Link>
          </div>
        </div>

        {/* 유저 아이콘 */}
        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
            className="bg-bg flex items-center gap-2"
          >
            <Image src="/icons/user.svg" alt="유저 아이콘" width={24} height={24} />
            <span className="text-sm text-white">{userName}</span>
          </button>

          {isProfileDropdownOpen && (
            <div className="bg-bg200 text-lg-rg text-gray100 absolute top-full right-0 mt-2 w-[184px] rounded-lg p-2 shadow-md">
              {DropDownProfileItemList}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
>>>>>>> 42d0bd3 (Chore : user.svg 추가)
