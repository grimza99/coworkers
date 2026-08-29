'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Membership, User } from '@/types/user';
import { getUser } from '@/api/user';
import axiosClient from '@/lib/axiosClient';
import { BFF_API } from '@/constants/api';

interface UserContextType {
  user: User | null;
  email: string | null;
  memberships: Membership[] | null;
  fetchUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  isLoading: boolean;
  setUser: (state: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, setUserState] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [memberships, setMemberships] = useState<Membership[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (state: User | null) => {
    if (!state) return;
    setUserState(state);
  };

  const fetchUser = useCallback(async () => {
    if (!userState?.id) return;
    setIsLoading(true);

    try {
      const response = await getUser();
      const { email, memberships } = response.data;
      if (!response.data.id) {
        setIsLoading(false);
        return;
      }
      setEmail(email);
      setMemberships(memberships);
    } catch {
      setEmail(null);
      setMemberships(null);
    }
    setIsLoading(false);
  }, [setEmail, userState]);

  const logoutUser = useCallback(async () => {
    setIsLoading(true);
    setUserState(null);
    setEmail(null);
    setMemberships(null);
    await axiosClient.post(BFF_API.auth.logout);

    setIsLoading(false);
  }, [setUserState, setEmail, setMemberships]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{ user: userState, email, memberships, fetchUser, logoutUser, isLoading, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
