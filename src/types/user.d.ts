export interface User {
  id: number;
  nickname: string;
  image: string;
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

interface getUserApiResponse extends User {
  createdAt: string;
  updatedAt: string;
  teamId: string;
  email: string;
  memberships: Membership[];
}
