'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';
import DropDown from '@/components/common/dropdown';
import { OptionSelector } from '@/components/common/dropdown/OptionSelector';
import DropDownProfileItemList from '@/components/common/dropdown/ProfileItem';
import DropDownGroupsItem from '@/components/common/dropdown/GroupsItem';
import SideMenu from './SideMenu';
// @TODO: 주소별로 헤더가 다르게 뜨도록

// @TODO: 데이터 연결
// 목데이터
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

          <div className="text-gray100 text-lg-md relative hidden items-center gap-8 md:flex lg:gap-10">
            <OptionSelector
              size="xl"
              defaultValue={selectedTeam}
              options={userData.teams.map((group) => {
                return <DropDownGroupsItem key={group.id} group={group} />;
              })}
              onSelect={() => {}}
              footerBtn={
                <Link
                  href={`/groups`}
                  className="text-text-primary border border-text-primary w-46 h-12 rounded-xl flex items-center justify-center"
                >
                  + 팀 추가하기
                </Link>
              }
            />
            <Link href={`/articles`} className="cursor:pointer mt-0">
              자유게시판
            </Link>
          </div>
        </div>

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