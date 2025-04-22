'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import Logo from './Logo';
import SideMenu from './SideMenu';
import DropDown from '@/components/common/dropdown';
import { OptionSelector } from '@/components/common/dropdown/OptionSelector';
import DropDownProfileItemList from '@/components/common/dropdown/ProfileItem';
import DropDownGroupsItem from '@/components/common/dropdown/GroupsItem';
// @TODO: 주소별로 헤더가 다르게 뜨도록

// @TODO: 데이터 연결
// 목데이터
const USER_DATA = {
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

const userName = USER_DATA.name;
const selectedTeam = USER_DATA.teams[0]?.name || '';

export default function Header() {
  const {
    ref: sideMenuRef,
    isOpen: isSideMenuOpen,
    setIsOpen: setIsSideMenuOpen,
  } = useOutSideClickAutoClose(false);

  return (
    <header className="bg-bg200 border-border sticky top-0 flex h-15 w-full justify-center border-b-1 py-[14px]">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSideMenuOpen(true)}
              className="block md:hidden"
              title="메뉴 열기"
            >
              <Image src="/icons/gnb-menu.svg" alt="메뉴" width={24} height={24} />
            </button>

            <Logo />
          </div>

          <div className="text-lg-md relative hidden items-center gap-8 md:flex lg:gap-10">
            <OptionSelector
              placement=""
              size="xl"
              defaultValue={selectedTeam}
              options={USER_DATA.teams.map((group) => {
                return <DropDownGroupsItem key={group.id} group={group} />;
              })}
              onSelect={() => {}}
              footerBtn={
                <Link
                  href={`/groups`}
                  className="text-text-primary border-text-primary flex h-12 w-46 items-center justify-center rounded-xl border"
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
        <div className="ml-auto">
          <DropDown
            size="lg"
            placement="top-8 right-[-8px]"
            dropDownOpenBtn={
              <button className="flex items-center gap-2">
                <Image src="/icons/user.svg" alt="유저 아이콘" width={24} height={24} />
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
        teams={USER_DATA.teams}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </header>
  );
}
