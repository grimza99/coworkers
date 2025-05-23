import axiosClient from '@/lib/axiosClient';
import { Group } from '@/types/group';

type InvitationToken = string;

export const getInvitationToken = async (groupId: Group['id']) =>
  axiosClient.get<InvitationToken>(`/groups/${groupId}/invitation`);
