'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { Membership, User } from '@/types/user';
import { getUser } from '@/api/user';

interface UserContextType {
  user: User | null;
  email: string | null;
  memberships: Membership[] | null;
  logoutUser: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [memberships, setMemberships] = useState<Membership[] | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await getUser();
      const { id, nickname, image, email, memberships } = response.data;
      setUser({ id, nickname, image });
      setEmail(email);
      setMemberships(memberships);
    } catch {
      setUser(null);
      setEmail(null);
      setMemberships(null);
    }
  }, [setUser, setEmail, setMemberships]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logoutUser = useCallback(async () => {
    setUser(null);
    setEmail(null);
    setMemberships(null);
  }, [setUser, setEmail, setMemberships]);

  return (
    <UserContext.Provider value={{ user, email, memberships, logoutUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
