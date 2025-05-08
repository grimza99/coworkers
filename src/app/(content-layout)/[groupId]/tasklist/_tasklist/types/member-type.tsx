type Role = 'ADMIN' | 'MEMBER';

export type Member = {
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};
