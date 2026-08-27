import { BFF_API } from '@/constants/api';
import axiosClient from '@/lib/axiosClient';
import { Group } from '@/types/group';

type InvitationToken = string;

export const getInvitationToken = async (groupId: Group['id']) =>
  axiosClient.get<InvitationToken>(BFF_API.member.copyInvitationCode(String(groupId)));
