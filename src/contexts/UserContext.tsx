'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Membership, User } from '@/types/user';
import { getUser } from '@/api/user';
import axiosClient from '@/lib/axiosClient';
import { BFF_API } from '@/constants/api';

interface UserContextType {
  user: IUserState | null;
  fetchUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  isLoading: boolean;
  setUserState: (state: IUserState | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

interface IUserState extends User {
  email: string;
  memberships: Membership[];
}
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setUserState = (newState: IUserState | null) => {
    setUser(newState);
  };
  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await getUser();
      const { email, memberships, id, nickname, image } = res.data;
      if (!id) {
        setIsLoading(false);
        return;
      }
      setUser({ email, memberships, id, nickname, image });
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);
  const logoutUser = useCallback(async () => {
    setIsLoading(true);
    setUser(null);
    await axiosClient.post(BFF_API.auth.logout);

    setIsLoading(false);
  }, [setUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, fetchUser, logoutUser, isLoading, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
