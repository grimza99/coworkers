'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Group } from '@/types/group';
import { getUser } from '@/api/user';

interface GroupContextType {
  groups: Group[];
  isLoading: boolean;
  fetchGroups: () => Promise<void>;
  refetchGroups: () => Promise<void>;
}

const GroupContext = createContext<GroupContextType | null>(null);

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getUser();
      const fetchedGroups = data.memberships?.map((m: { group: Group }) => m.group) ?? [];
      setGroups(fetchedGroups);
    } catch (e) {
      console.error('Failed to fetch groups:', e);
      setGroups([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const tokenExists = document.cookie.includes('accessToken');
    if (!tokenExists) return;

    fetchGroups();
  }, [fetchGroups]);

  // Provide a stable refetchGroups function for external refresh
  const refetchGroups = fetchGroups;

  return (
    <GroupContext.Provider value={{ groups, fetchGroups, refetchGroups, isLoading }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = (): GroupContextType => {
  const ctx = useContext(GroupContext);
  if (!ctx) throw new Error('useGroups must be used within GroupProvider');
  return ctx;
};
