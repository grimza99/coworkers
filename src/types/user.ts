import { Group } from '@/types/group';

export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Membership {
  userId: User['id'];
  userName: User['nickname'];
  userImage: User['image'];
  userEmail: string;
  role: Role;
  groupId: Group['id'];
  group: Group;
}

export type Role = 'ADMIN' | 'MEMBER';

export interface getUserApiResponse extends User {
  createdAt: string;
  updatedAt: string;
  teamId: string;
  email: string;
  memberships: Membership[];
}
