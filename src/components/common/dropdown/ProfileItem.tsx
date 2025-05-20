import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { deleteClientCookie } from '@/lib/cookie/client';
import PATHS from '@/constants/paths';

const PROFILE_DROPDOWN_LIST = [
  { text: '마이 히스토리', src: '/myhistory' },
  { text: '계정 설정', src: '/mypage' },
  { text: '팀 참여', src: '/joingroup' },
  { text: '로그아웃', src: '' },
];

export default function DropDownProfileItemList() {
  const { logoutUser } = useUser();

  const handleClickLogOut = () => {
    logoutUser();
    deleteClientCookie('accessToken');
    deleteClientCookie('refreshToken');
    location.reload();
    window.location.href = `${PATHS.LOGIN}`;
  };

  return PROFILE_DROPDOWN_LIST.map((list, index) => {
    const isLast = index === PROFILE_DROPDOWN_LIST.length - 1;

    return isLast ? (
      <button type="button" onClick={handleClickLogOut} key={list.text}>
        {list.text}
      </button>
    ) : (
      <Link href={list.src} key={list.text}>
        {list.text}
      </Link>
    );
  });
}
